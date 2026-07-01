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


def build_recommend_prompt(
    map_name: str,
    map_description: str,
    existing_agents: list[str],
    agent_info: list[str] | None = None,
    search_context: str = "",
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
    search_block = (
        f"\n\n[최신 웹 검색 결과 - 실제 메타/승률 참고 자료]\n{search_context}\n"
        "위 검색 결과에 등장하는 요원과 근거를 최우선으로 반영하세요."
        if search_context else ""
    )

    return f"""아래 맵에서 가장 강한 5인 조합을 추천하세요. 한국어로만 작성. 영어·가타카나 금지. Note나 추신 금지.

[맵]: {map_name}{desc_line}

[사용 가능한 요원 (한국어명/영어명, 역할: 설명)]
{agent_list}
{search_block}

중요: 요원은 반드시 위 [사용 가능한 요원] 목록에 있는 이름만 사용하세요. 목록에 없는 이름을 절대 지어내지 마세요.
아래 4개 섹션을 순서대로 전부 빠짐없이 작성하세요. 하나라도 생략하면 안 됩니다.

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
