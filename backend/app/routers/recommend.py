from fastapi import APIRouter
from app.models.schemas import RecommendRequest, RecommendResponse
from app.services.ollama_service import generate, build_recommend_prompt
from app.services.supabase_service import get_agents, get_maps

router = APIRouter()


@router.post("/", response_model=RecommendResponse)
async def recommend_agents(req: RecommendRequest):
    agents = get_agents()
    maps = get_maps()

    agent_info = [
        f"{a['name']} ({a['role']}): {a.get('description', '')}"
        for a in agents
    ]

    map_description = next(
        (m.get("description", "") for m in maps if m["name"] == req.map),
        ""
    )

    prompt = build_recommend_prompt(req.map, map_description, req.existing_agents, agent_info)
    result = await generate(prompt)
    return RecommendResponse(
        agents=req.existing_agents or [],
        reason=result,
        composition=result,
    )
