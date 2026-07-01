import logging
from fastapi import APIRouter
from app.models.schemas import RecommendRequest, RecommendResponse
from app.services.prompt_service import build_recommend_prompt
from app.services.deepseek_service import generate
from app.services.supabase_service import get_agents, get_maps
from app.services.tavily_service import search_map_meta, format_search_context

router = APIRouter()
logger = logging.getLogger(__name__)


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

    try:
        search_results = await search_map_meta(req.map)
        search_context = format_search_context(search_results)
    except Exception:
        logger.exception("Tavily 검색 실패, 검색 근거 없이 진행")
        search_results = []
        search_context = ""

    prompt = build_recommend_prompt(req.map, map_description, req.existing_agents, agent_info, search_context)
    result = await generate(prompt)
    return RecommendResponse(
        agents=req.existing_agents or [],
        reason=result,
        composition=result,
        sources=[{"title": r["title"], "url": r["url"]} for r in search_results],
    )
