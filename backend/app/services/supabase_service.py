from supabase import create_client, Client
from app.config import settings


def get_supabase() -> Client:
    return create_client(settings.supabase_url, settings.supabase_key)


def get_agents() -> list[dict]:
    supabase = get_supabase()
    res = supabase.table("agents").select("*").order("name").execute()
    return res.data


EXCLUDED_MAPS = {"사격장", "The Range", "Piazza", "District", "Kasbah", "Drift", "Basic Training", "기초 훈련"}

def get_maps() -> list[dict]:
    supabase = get_supabase()
    res = supabase.table("maps").select("*").order("name").execute()
    return [m for m in res.data if m.get("description") and m["name"] not in EXCLUDED_MAPS]


async def save_recommendation(user_id: str, map: str, agents: list[str], reason: str):
    supabase = get_supabase()
    return supabase.table("recommendations").insert({
        "user_id": user_id,
        "map": map,
        "agents": agents,
        "reason": reason,
    }).execute()


async def get_user_history(user_id: str):
    supabase = get_supabase()
    return supabase.table("recommendations") \
        .select("*") \
        .eq("user_id", user_id) \
        .order("created_at", desc=True) \
        .limit(20) \
        .execute()
