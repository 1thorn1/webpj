from pydantic import BaseModel
from typing import Optional


class RecommendRequest(BaseModel):
    map: str
    playstyle: Optional[str] = None  # aggressive, support, entry, etc.
    existing_agents: Optional[list[str]] = []


class Source(BaseModel):
    title: str
    url: str


class RecommendResponse(BaseModel):
    agents: list[str]
    reason: str
    composition: str
    sources: list[Source] = []


class Agent(BaseModel):
    name: str
    role: str  # duelist, initiator, controller, sentinel
    description: str
