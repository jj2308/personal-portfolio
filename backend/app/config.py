from __future__ import annotations

import os
from dataclasses import dataclass, field

from dotenv import load_dotenv


load_dotenv()


@dataclass(frozen=True)
class Settings:
    openrouter_api_key: str | None = os.getenv("OPENROUTER_API_KEY")
    openrouter_model: str = os.getenv("OPENROUTER_MODEL", "openchat/openchat-7b:free")

    allowed_origins: list[str] = field(default_factory=lambda: ["*"])

    chroma_persist_dir: str = os.getenv("CHROMA_PERSIST_DIR", "./chroma")
    resume_pdf_path: str = os.getenv("RESUME_PDF_PATH", "../public/resume.pdf")
    site_source_dir: str = os.getenv("SITE_SOURCE_DIR", "../src/components")
    site_content_md_path: str = os.getenv("SITE_CONTENT_MD_PATH", "./data/site_content.md")


settings = Settings()
