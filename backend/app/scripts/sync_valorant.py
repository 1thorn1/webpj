"""
valorant-api.com 에서 요원/맵 데이터를 가져와 Supabase에 저장하는 스크립트.
패치 후 수동으로 실행: python -m app.scripts.sync_valorant
"""
import asyncio
import httpx
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "../../"))

from app.config import settings
from supabase import create_client

VALORANT_API = "https://valorant-api.com/v1"


async def fetch_agents() -> list[dict]:
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{VALORANT_API}/agents", params={"isPlayableCharacter": "true", "language": "ko-KR"})
        res.raise_for_status()
        return res.json()["data"]


async def fetch_maps() -> list[dict]:
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{VALORANT_API}/maps", params={"language": "ko-KR"})
        res.raise_for_status()
        return res.json()["data"]


def upsert_agents(supabase, agents: list[dict]):
    rows = [
        {
            "uuid": a["uuid"],
            "name": a["displayName"],
            "role": a["role"]["displayName"] if a.get("role") else "Unknown",
            "description": a.get("description", ""),
            "icon_url": a.get("displayIcon", ""),
        }
        for a in agents
    ]
    supabase.table("agents").upsert(rows).execute()
    print(f"요원 {len(rows)}명 저장 완료")


def upsert_maps(supabase, maps: list[dict]):
    rows = [
        {
            "uuid": m["uuid"],
            "name": m["displayName"],
            "description": m.get("tacticalDescription", ""),
            "image_url": m.get("splash", ""),
        }
        for m in maps
        if m.get("displayName")
    ]
    supabase.table("maps").upsert(rows).execute()
    print(f"맵 {len(rows)}개 저장 완료")


async def main():
    supabase = create_client(settings.supabase_url, settings.supabase_key)
    print("valorant-api.com에서 데이터 가져오는 중...")
    agents, maps = await asyncio.gather(fetch_agents(), fetch_maps())
    upsert_agents(supabase, agents)
    upsert_maps(supabase, maps)
    print("동기화 완료")


if __name__ == "__main__":
    asyncio.run(main())
