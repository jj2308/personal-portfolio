from __future__ import annotations

from typing import Any

import httpx


class OpenRouterClient:
    def __init__(self, api_key: str, model: str) -> None:
        self._api_key = api_key
        self._model = model
        self._base_url = "https://openrouter.ai/api/v1"

    def chat_completions(self, messages: list[dict[str, Any]], *, temperature: float = 0.2) -> str:
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self._model,
            "messages": messages,
            "temperature": temperature,
        }

        with httpx.Client(timeout=60.0) as client:
            resp = client.post(f"{self._base_url}/chat/completions", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()

        return data["choices"][0]["message"]["content"]
