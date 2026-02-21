from __future__ import annotations

import re


def chunk_text(text: str, *, max_chars: int = 1000, overlap: int = 150) -> list[str]:
    cleaned = re.sub(r"\s+", " ", text).strip()
    if not cleaned:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(cleaned):
        end = min(len(cleaned), start + max_chars)
        chunk = cleaned[start:end].strip()
        if chunk:
            chunks.append(chunk)

        if end >= len(cleaned):
            break
        start = max(0, end - overlap)

    return chunks
