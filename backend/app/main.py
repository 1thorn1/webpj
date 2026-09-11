from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import recommend, agents, quiz, chat

app = FastAPI(title="Valorant Recommender API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router, prefix="/recommend", tags=["recommend"])
app.include_router(agents.router, prefix="/agents", tags=["agents"])
app.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])


@app.get("/health")
def health():
    return {"status": "ok"}
