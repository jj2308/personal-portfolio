from __future__ import annotations

from dataclasses import dataclass

import chromadb
from chromadb.utils import embedding_functions


@dataclass(frozen=True)
class RetrievedDoc:
    id: str
    text: str
    source: str
    distance: float


class ChromaStore:
    def __init__(self, *, persist_dir: str, collection_name: str = "portfolio") -> None:
        self._client = chromadb.PersistentClient(path=persist_dir)

        # Local embeddings (no API key required)
        self._embedder = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )

        self._collection = self._client.get_or_create_collection(
            name=collection_name,
            embedding_function=self._embedder,
            metadata={"hnsw:space": "cosine"},
        )

    def upsert_texts(self, texts: list[str], *, source: str) -> None:
        if not texts:
            return
        ids = [f"{source}:{i}" for i in range(len(texts))]
        metadatas = [{"source": source} for _ in texts]
        self._collection.upsert(ids=ids, documents=texts, metadatas=metadatas)

    def query(self, query_text: str, *, k: int = 5) -> list[RetrievedDoc]:
        res = self._collection.query(query_texts=[query_text], n_results=k)

        ids = res.get("ids", [[]])[0]
        docs = res.get("documents", [[]])[0]
        metas = res.get("metadatas", [[]])[0]
        dists = res.get("distances", [[]])[0]

        out: list[RetrievedDoc] = []
        for i in range(len(ids)):
            out.append(
                RetrievedDoc(
                    id=str(ids[i]),
                    text=str(docs[i]),
                    source=str(metas[i].get("source", "unknown")) if metas and metas[i] else "unknown",
                    distance=float(dists[i]) if dists else 0.0,
                )
            )
        return out
