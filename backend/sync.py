import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

import asyncio
import httpx
from app.config import settings
from supabase import create_client

VALORANT_API = "https://valorant-api.com/v1"


async def fetch_agents():
    async with httpx.AsyncClient() as client:
        ko_res, en_res = await asyncio.gather(
            client.get(f"{VALORANT_API}/agents", params={"isPlayableCharacter": "true", "language": "ko-KR"}),
            client.get(f"{VALORANT_API}/agents", params={"isPlayableCharacter": "true", "language": "en-US"}),
        )
        ko_res.raise_for_status()
        en_res.raise_for_status()

        ko_agents = {a["uuid"]: a for a in ko_res.json()["data"]}
        en_agents = {a["uuid"]: a for a in en_res.json()["data"]}

        # 이름은 한국어, 스킬 설명은 영어로 합치기
        merged = []
        for uuid, ko in ko_agents.items():
            en = en_agents.get(uuid, {})
            ko["abilities"] = en.get("abilities", [])
            merged.append(ko)
        return merged


async def fetch_maps():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{VALORANT_API}/maps", params={"language": "ko-KR"})
        res.raise_for_status()
        return res.json()["data"]


async def main():
    supabase = create_client(settings.supabase_url, settings.supabase_key)
    print("valorant-api.com에서 데이터 가져오는 중...")

    agents, maps = await asyncio.gather(fetch_agents(), fetch_maps())

    agent_rows = []
    for a in agents:
        abilities = a.get("abilities", [])
        abilities_text = " | ".join([
            f"{ab.get('slot', '')}:{ab['displayName']}: {ab.get('description', '')}"
            for ab in abilities
            if ab.get("displayName") and ab.get("description")
        ])
        agent_rows.append({
            "uuid": a["uuid"],
            "name": a["displayName"],
            "role": a["role"]["displayName"] if a.get("role") else "Unknown",
            "description": a.get("description", ""),
            "icon_url": a.get("displayIcon", ""),
            "abilities": abilities_text,
        })
    supabase.table("agents").upsert(agent_rows).execute()
    print(f"요원 {len(agent_rows)}명 저장 완료")

    map_rows = [
        {
            "uuid": m["uuid"],
            "name": m["displayName"],
            "description": m.get("tacticalDescription", ""),
            "image_url": m.get("splash", ""),
        }
        for m in maps
        if m.get("displayName")
    ]
    supabase.table("maps").upsert(map_rows).execute()
    print(f"맵 {len(map_rows)}개 저장 완료")
    print("동기화 완료")


asyncio.run(main())
