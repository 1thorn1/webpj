import httpx
from app.config import settings

SYSTEM_PROMPT = (
    "당신은 발로란트 전문 코치입니다. "
    "모든 답변은 반드시 한국어로만 작성하세요. "
    "영어, 일본어, 가타카나, 히라가나를 절대 사용하지 마세요. "
    "답변 마지막에 'Note:', '참고:', '주의:' 같은 추신을 절대 추가하지 마세요. "
    "마크다운 형식(##, -, **굵게**)을 정확히 사용하세요."
)


async def chat(messages: list[dict]) -> str:
    payload = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{settings.deepseek_base_url}/chat/completions",
            headers={"Authorization": f"Bearer {settings.deepseek_api_key}"},
            json={
                "model": settings.deepseek_model,
                "messages": payload,
                "stream": False,
                "temperature": 0.85,
                "top_p": 0.9,
            },
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]


async def generate(prompt: str) -> str:
    return await chat([{"role": "user", "content": prompt}])
