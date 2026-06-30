import { useEffect, useState } from "react";
import { fetchQuestions, submitQuiz } from "../api/quiz";
import { Button } from "./ds/Button";

export default function Quiz({ onResult }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 현재 질문 번호

  useEffect(() => {
    fetchQuestions().then(setQuestions).catch(console.error);
  }, []);

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

  async function handleSubmit() {
    setLoading(true);
    try {
      const result = await submitQuiz(answers);
      onResult(result);
    } finally {
      setLoading(false);
    }
  }

  function selectOption(value) {
    setAnswers(prev => ({ ...prev, [current.id]: value }));
    if (!isLast) setTimeout(() => setStep(s => s + 1), 200);
  }

  if (!current) return null;

  return (
    <div style={{ maxWidth: 600 }}>
      {/* 진행 바 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-on-dark-3)",
          marginBottom: 10,
        }}>
          <span>Agent Analysis</span>
          <span>{step + 1} / {questions.length}</span>
        </div>
        <div style={{ height: 2, background: "var(--border-dark)", borderRadius: 2 }}>
          <div style={{
            height: "100%",
            width: `${((step + 1) / questions.length) * 100}%`,
            background: "var(--accent)",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>

      {/* 질문 */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 24,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: "var(--text-on-dark)",
        marginBottom: 24,
        lineHeight: 1.1,
      }}>
        {current.text}
      </div>

      {/* 선택지 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {current.options.map(opt => {
          const selected = answers[current.id] === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => selectOption(opt.value)}
              style={{
                padding: "14px 20px",
                background: selected ? "rgba(255,70,85,0.12)" : "var(--surface-dark)",
                border: `1.5px solid ${selected ? "var(--accent)" : "var(--border-dark)"}`,
                borderRadius: "var(--r-lg)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: selected ? "var(--text-on-dark)" : "var(--text-on-dark-2)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: `2px solid ${selected ? "var(--accent)" : "var(--border-dark)"}`,
                background: selected ? "var(--accent)" : "transparent",
                flexShrink: 0,
                transition: "all 0.15s ease",
              }} />
              {opt.label}
            </div>
          );
        })}
      </div>

      {/* 네비게이션 */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {step > 0 && (
          <Button variant="outline" size="sm" onDark onClick={() => setStep(s => s - 1)}>
            ← 이전
          </Button>
        )}
        {isLast ? (
          <Button
            variant="primary"
            size="md"
            disabled={!allAnswered || loading}
            onClick={handleSubmit}
          >
            {loading ? "분석 중..." : "요원 추천받기 →"}
          </Button>
        ) : (
          answers[current.id] && (
            <Button variant="ghost" size="sm" onClick={() => setStep(s => s + 1)}>
              다음 →
            </Button>
          )
        )}
      </div>
    </div>
  );
}
