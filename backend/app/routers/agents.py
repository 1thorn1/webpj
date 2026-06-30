from fastapi import APIRouter, HTTPException
from app.services.supabase_service import get_agents, get_maps

router = APIRouter()


@router.get("/")
def list_agents():
    agents = get_agents()
    if not agents:
        raise HTTPException(status_code=404, detail="요원 데이터가 없습니다. sync_valorant 스크립트를 먼저 실행하세요.")
    return agents


@router.get("/maps")
def list_maps():
    maps = get_maps()
    if not maps:
        raise HTTPException(status_code=404, detail="맵 데이터가 없습니다. sync_valorant 스크립트를 먼저 실행하세요.")
    return maps
