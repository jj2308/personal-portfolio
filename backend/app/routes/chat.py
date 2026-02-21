from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.models.schemas import ChatRequest, ChatResponse
from app.rag.pipeline import answer_with_rag


router = APIRouter(prefix="", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    try:
        result = answer_with_rag(req.message)
        return ChatResponse(answer=result["answer"], sources=result.get("sources", []))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
