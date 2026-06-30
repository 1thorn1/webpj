from fastapi import APIRouter
from pydantic import BaseModel
from app.data.scoring import QUESTIONS
from app.services.scoring_service import calculate_scores, get_flash_agents
from app.services.ollama_service import generate

router = APIRouter()


class QuizAnswers(BaseModel):
    answers: dict[str, str]


@router.get("/questions")
def get_questions():
    return QUESTIONS


@router.get("/flash-agents")
def flash_agents():
    """API 데이터 기준으로 플래시 보유 요원 목록 확인용"""
    return {"flash_agents": get_flash_agents()}


@router.post("/score")
async def score_quiz(body: QuizAnswers):
    scored = calculate_scores(body.answers)

    best_score = scored[0]["score"] if scored else 0
    top_agents = [a for a in scored if a["score"] == best_score and a["score"] > 0] or [scored[0]]

    agent_names = [a["name"] for a in top_agents]
    agents_str = ", ".join(agent_names)

    answers_str = "\n".join([
        f"- {QUESTIONS[[q['id'] for q in QUESTIONS].index(qid)]['text']}: "
        f"{next(o['label'] for o in QUESTIONS[[q['id'] for q in QUESTIONS].index(qid)]['options'] if o['value'] == val)}"
        for qid, val in body.answers.items()
        if any(q['id'] == qid for q in QUESTIONS)
    ])

    prompt = f"""아래는 플레이어의 성향 분석 결과입니다.

[플레이어 성향]
{answers_str}

[추천 요원]: {agents_str}

다음 형식을 정확히 따라 한국어로만 작성하세요. 영어·가타카나 금지. Note나 추신 금지.

{chr(10).join(f"## {name}{chr(10)}이 플레이어에게 왜 잘 맞는지 2~3문장으로 설명." for name in agent_names)}

각 요원 설명에서 스킬 이름과 플레이어 성향의 연관성을 구체적으로 서술하세요."""

    explanation = await generate(prompt)

    return {
        "top_agents": top_agents,
        "explanation": explanation,
        "all_scores": scored,
    }
