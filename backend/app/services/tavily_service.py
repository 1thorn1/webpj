import httpx
from app.config import settings


async def search_map_meta(map_name: str) -> list[dict]:
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            "https://api.tavily.com/search",
            headers={"Authorization": f"Bearer {settings.tavily_api_key}"},
            json={
                "query": f"발로란트 {map_name} 맵 메타 조합 승률 요원 픽률",
                "search_depth": "advanced",
                "max_results": 5,
                "time_range": "month",
            },
        )
        response.raise_for_status()
        return response.json().get("results", [])


def format_search_context(results: list[dict]) -> str:
    if not results:
        return ""

    lines = []
    for r in results:
        lines.append(f"- [{r['title']}] {r['content']}")
    return "\n".join(lines)
