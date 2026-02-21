from __future__ import annotations

from app.config import settings
from app.rag.chunking import chunk_text
from app.rag.ingest import read_pdf_text, read_react_components_text, read_text_file, strip_jsx_to_text
from app.rag.vectorstore import ChromaStore
from app.services.openrouter_client import OpenRouterClient


_store: ChromaStore | None = None
_ingested: bool = False


def _get_store() -> ChromaStore:
    global _store
    if _store is None:
        _store = ChromaStore(persist_dir=settings.chroma_persist_dir)
    return _store


def _maybe_ingest() -> None:
    global _ingested
    if _ingested:
        return

    store = _get_store()

    pdf_text = read_pdf_text(settings.resume_pdf_path)
    if pdf_text:
        store.upsert_texts(chunk_text(pdf_text), source="resume.pdf")

    site_md = read_text_file(settings.site_content_md_path)
    if site_md:
        store.upsert_texts(chunk_text(site_md), source="site_content.md")

    component_sources = read_react_components_text(settings.site_source_dir)
    for path, src in component_sources:
        extracted = strip_jsx_to_text(src)
        if extracted.strip():
            store.upsert_texts(chunk_text(extracted), source=path)

    _ingested = True


def answer_with_rag(user_message: str) -> dict:
    if not settings.openrouter_api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not set")

    fallback = "I couldn’t find that information in Joel’s resume or portfolio."

    _maybe_ingest()
    store = _get_store()

    retrieved = store.query(user_message, k=6)

    if not retrieved:
        return {"answer": fallback, "sources": []}

    best_distance = min(d.distance for d in retrieved)
    # With cosine distance: smaller is more similar. If everything is too far,
    # don't ask the LLM to guess.
    if best_distance > 0.45:
        return {"answer": fallback, "sources": []}

    context_blocks = [f"SOURCE: {d.source}\n{d.text}" for d in retrieved]
    context = "\n\n---\n\n".join(context_blocks)

    # Keep prompt size bounded (rough heuristic based on characters).
    max_context_chars = 6000
    if len(context) > max_context_chars:
        context = context[:max_context_chars].rsplit(" ", 1)[0] + "..."

    if len(context.strip()) < 200:
        return {"answer": fallback, "sources": []}

    system = (
        "You are Joel’s AI portfolio assistant. "
        "Answer ONLY using the provided context from Joel’s resume and portfolio. "
        "Do not infer, guess, assume, or extrapolate beyond the context. "
        f"If the answer is not present in the context, reply with exactly: \"{fallback}\" "
        "Write in plain text (no Markdown, no **bold**, no links). "
        "Keep answers concise, professional, and recruiter-friendly. "
        "Prefer a structured format when helpful: a 1-line summary, then 2-5 bullet points. "
        "For lists (skills, projects), use '-' bullets and keep each bullet to one line."
    )

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": f"CONTEXT:\n{context}\n\nUSER QUESTION:\n{user_message}"},
    ]

    client = OpenRouterClient(settings.openrouter_api_key, settings.openrouter_model)
    answer = client.chat_completions(messages)

    return {
        "answer": answer.strip(),
        "sources": list(dict.fromkeys([d.source for d in retrieved])),
    }
