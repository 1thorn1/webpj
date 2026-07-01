import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { Button } from "./ds/Button";

export default function Chat() {
  const { messages, loading, error, send } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    send(text);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div style={{
      maxWidth: 640,
      border: "1px solid var(--border-dark)",
      borderRadius: "var(--r-lg)",
      background: "var(--surface-dark)",
      display: "flex",
      flexDirection: "column",
      height: 520,
    }}>
      <div style={{
        padding: "14px 20px",
        borderBottom: "1px solid var(--border-dark)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-on-dark-3)",
      }}>
        발로란트 AI 코치
      </div>

      <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.length === 0 && (
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--text-on-dark-3)",
            lineHeight: 1.6,
          }}>
            요원 조합, 전략, 플레이 팁 등 무엇이든 물어보세요.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "82%",
              padding: "10px 14px",
              borderRadius: "var(--r-md)",
              background: m.role === "user" ? "var(--accent)" : "var(--ink-900)",
              color: m.role === "user" ? "var(--on-accent)" : "var(--text-on-dark)",
              border: m.role === "user" ? "none" : "1px solid var(--border-dark)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--text-on-dark-3)",
          }}>
            코치가 답변을 작성 중...
          </div>
        )}
        {error && (
          <div style={{
            alignSelf: "flex-start",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--val-red-bright)",
          }}>
            Error: {error}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, padding: 14, borderTop: "1px solid var(--border-dark)" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="질문을 입력하세요..."
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            background: "var(--ink-900)",
            border: "1px solid var(--border-dark)",
            borderRadius: "var(--r-md)",
            padding: "10px 14px",
            color: "var(--text-on-dark)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            outline: "none",
          }}
        />
        <Button variant="primary" size="md" disabled={loading || !input.trim()} onClick={handleSend}>
          전송
        </Button>
      </div>
    </div>
  );
}
