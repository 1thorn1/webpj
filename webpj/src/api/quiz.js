const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/quiz/questions`);
  if (!res.ok) throw new Error("질문 로딩 실패");
  return res.json();
}

export async function submitQuiz(answers) {
  const res = await fetch(`${BASE_URL}/quiz/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("점수 계산 실패");
  return res.json();
}
