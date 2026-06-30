from app.data.scoring import SCORING_RULES
from app.services.supabase_service import get_agents

FLASH_KEYWORDS = ["blind", "flash", "nearsight"]


def get_flash_agents() -> list[str]:
    """Ultimate 슬롯 제외하고 flash/blind/nearsight 키워드로 요원 찾기"""
    agents = get_agents()
    result = []
    for a in agents:
        abilities_text = a.get("abilities") or ""
        # Ultimate 슬롯 제외 (Viper's Pit 등 궁극기 지속형 클라우드 오탐 방지)
        non_ultimate = " | ".join(
            part for part in abilities_text.split("|")
            if not part.strip().lower().startswith("ultimate:")
        )
        if any(kw in non_ultimate.lower() for kw in FLASH_KEYWORDS):
            result.append(a["name"])
    return result


def build_flash_rules() -> dict[str, dict[str, int]]:
    flash_agents = get_flash_agents()
    non_flash_agents = ["소바", "킬조이", "사이퍼", "바이퍼", "체임버"]
    return {
        "yes": {name: 5 for name in flash_agents},
        "no":  {name: 3 for name in non_flash_agents},
    }


def calculate_scores(answers: dict[str, str]) -> list[dict]:
    all_agents = {a["name"]: a for a in get_agents()}
    scores: dict[str, int] = {}

    # 플래시 룰은 API 데이터 기반으로 동적 생성
    dynamic_rules = {**SCORING_RULES, "flash": build_flash_rules()}

    for question_id, answer_value in answers.items():
        rules = dynamic_rules.get(question_id, {}).get(answer_value, {})
        for agent, points in rules.items():
            scores[agent] = scores.get(agent, 0) + points

    result = []
    for name, agent in all_agents.items():
        result.append({
            "name": name,
            "role": agent.get("role", ""),
            "description": agent.get("description", ""),
            "icon_url": agent.get("icon_url", ""),
            "score": scores.get(name, 0),
        })

    result.sort(key=lambda x: x["score"], reverse=True)
    return result
