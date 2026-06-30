const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function fetchRecommendation({ map, playstyle, existingAgents }) {
  const res = await fetch(`${BASE_URL}/recommend/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      map,
      playstyle,
      existing_agents: existingAgents,
    }),
  });
  if (!res.ok) throw new Error("추천 요청 실패");
  return res.json();
}

export async function fetchAgents() {
  const res = await fetch(`${BASE_URL}/agents/`);
  if (!res.ok) throw new Error("요원 목록 조회 실패");
  return res.json();
}

export async function fetchMaps() {
  const res = await fetch(`${BASE_URL}/agents/maps`);
  if (!res.ok) throw new Error("맵 목록 조회 실패");
  return res.json();
}
