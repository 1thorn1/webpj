from fastapi import APIRouter
from pydantic import BaseModel
from app.services.deepseek_service import chat as deepseek_chat

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@router.post("/message")
async def chat_message(req: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    reply = await deepseek_chat(messages)
    return {"reply": reply}
