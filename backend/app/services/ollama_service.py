import httpx
from app.config import settings

AGENT_NAME_MAP = {
    "제트": "Jett", "레이나": "Reyna", "피닉스": "Phoenix", "네온": "Neon",
    "요루": "Yoru", "아이소": "Iso", "레이즈": "Raze",
    "소바": "Sova", "페이드": "Fade", "케이오": "KAY/O", "브리치": "Breach",
    "게코": "Gekko", "스카이": "Skye",
    "바이퍼": "Viper", "오멘": "Omen", "브림스톤": "Brimstone",
    "아스트라": "Astra", "하버": "Harbor", "클로브": "Clove",
    "세이지": "Sage", "킬조이": "Killjoy", "사이퍼": "Cypher",
    "체임버": "Chamber", "데드록": "Deadlock", "바이즈": "Vyse",
}


SYSTEM_PROMPT = (
    "당신은 발로란트 전문 코치입니다. "
    "모든 답변은 반드시 한국어로만 작성하세요. "
    "영어, 일본어, 가타카나, 히라가나를 절대 사용하지 마세요. "
    "답변 마지막에 'Note:', '참고:', '주의:' 같은 추신을 절대 추가하지 마세요. "
    "마크다운 형식(##, -, **굵게**)을 정확히 사용하세요."
)


async def generate(prompt: str) -> str:
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{settings.ollama_base_url}/api/generate",
            json={
                "model": settings.ollama_model,
                "system": SYSTEM_PROMPT,
                "prompt": prompt,
                "stream": False,
                "options": {"temperature": 0.85, "top_p": 0.9},
            },
        )
        response.raise_for_status()
        return response.json()["response"]


def build_recommend_prompt(
    map_name: str,
    map_description: str,
    existing_agents: list[str],
    agent_info: list[str] | None = None,
) -> str:
    agent_lines = []
    if agent_info:
        for line in agent_info:
            kr_name = line.split(" (")[0]
            en_name = AGENT_NAME_MAP.get(kr_name, "")
            en_suffix = f"/{en_name}" if en_name else ""
            agent_lines.append(line.replace(kr_name, f"{kr_name}{en_suffix}", 1))

    agent_list = "\n".join(agent_lines) if agent_lines else "정보 없음"
    desc_line = f"\n맵 설명: {map_description}" if map_description else ""

    return f"""아래 맵에서 가장 강한 5인 조합을 추천하세요. 한국어로만 작성. 영어·가타카나 금지. Note나 추신 금지.

[맵]: {map_name}{desc_line}

[사용 가능한 요원 (한국어명/영어명, 역할: 설명)]
{agent_list}

반드시 아래 형식을 그대로 사용하세요:

## 추천 조합
요원 한국어 이름 5명, 쉼표로 구분

## 맵 특성
이 맵의 구조적 특징과 전술적 포인트

## 조합 이유
이 맵에서 이 5명이 왜 강한지 구체적으로

## 역할 분담
- 요원명: 역할
- 요원명: 역할
- 요원명: 역할
- 요원명: 역할
- 요원명: 역할
"""
