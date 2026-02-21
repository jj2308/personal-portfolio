from __future__ import annotations

import os
from pathlib import Path

from pypdf import PdfReader


def read_pdf_text(pdf_path: str) -> str:
    p = Path(pdf_path)
    if not p.exists():
        return ""

    reader = PdfReader(str(p))
    parts: list[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\n".join(parts).strip()


def read_text_file(file_path: str) -> str:
    p = Path(file_path)
    if not p.exists():
        return ""
    try:
        return p.read_text(encoding="utf-8", errors="ignore").strip()
    except Exception:
        return ""


def read_react_components_text(components_dir: str) -> list[tuple[str, str]]:
    base = Path(components_dir)
    if not base.exists():
        return []

    results: list[tuple[str, str]] = []
    for path in base.rglob("*.js"):
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        results.append((str(path), text))

    for path in base.rglob("*.jsx"):
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        results.append((str(path), text))

    for path in base.rglob("*.ts"):
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        results.append((str(path), text))

    for path in base.rglob("*.tsx"):
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        results.append((str(path), text))

    return results


def strip_jsx_to_text(source: str) -> str:
    # Heuristic: keep string literals and remove most syntax.
    # This is intentionally simple to avoid bringing a JS parser.
    import re

    # Remove import/export lines
    s = re.sub(r"^\s*(import|export)\b.*$", "", source, flags=re.MULTILINE)
    # Remove jsx tags
    s = re.sub(r"<[^>]+>", " ", s)
    # Keep content inside quotes
    strings = re.findall(r"\\\"([^\\\"]+)\\\"|'([^']+)'", s)
    flat = []
    for a, b in strings:
        val = a or b

        if not val:
            continue

        lower = val.lower()
        # Avoid ingesting likely secrets/tokens from source files.
        if "github_pat_" in lower or "api_key" in lower or "apikey" in lower or "bearer " in lower:
            continue

        # Skip very long single tokens that look like credentials.
        if len(val) >= 80 and re.fullmatch(r"[A-Za-z0-9_\-\.]+", val):
            continue

        flat.append(val)

    return "\n".join(flat)
