const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function sendChatMessage(messages) {
  const res = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error("응답 실패");
  return res.json();
}
