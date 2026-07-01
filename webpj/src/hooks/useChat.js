import { useState } from "react";
import { sendChatMessage } from "../api/chat";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function send(content) {
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    setError(null);
    try {
      const data = await sendChatMessage(next);
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, error, send };
}
