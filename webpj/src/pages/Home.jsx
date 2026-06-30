import RecommendForm from "../components/RecommendForm";
import ResultCard from "../components/ResultCard";
import LoginButton from "../components/LoginButton";
import Quiz from "../components/Quiz";
import QuizResult from "../components/QuizResult";
import { useRecommend } from "../hooks/useRecommend";
import { useState } from "react";

export default function Home() {
  const { result, loading, error, recommend } = useRecommend();
  const [selectedMap, setSelectedMap] = useState("");
  const [mode, setMode] = useState("map"); // "map" | "quiz"
  const [quizResult, setQuizResult] = useState(null);

  function handleSubmit(params) {
    setSelectedMap(params.map);
    recommend(params);
  }

  return (
    <div style={{ minHeight: "100svh", background: "var(--ink-900)" }}>

      {/* Nav */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--container-pad)",
        height: 60,
        borderBottom: "1px solid var(--border-dark)",
        background: "var(--ink-900)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-on-dark)",
        }}>
          Valorant <span style={{ color: "var(--accent)" }}>//</span> Intel
        </div>
        <LoginButton />
      </nav>

      {/* Hero */}
      <div style={{
        padding: "72px var(--container-pad) 56px",
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 16,
        }}>
          Agent Composition · Tactical Intel
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(40px, 6vw, 72px)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          color: "var(--text-on-dark)",
          marginBottom: 20,
        }}>
          Lock In Your<br />
          <span style={{ color: "var(--accent)" }}>Composition</span>
        </h1>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          color: "var(--text-on-dark-2)",
          maxWidth: 480,
          lineHeight: 1.65,
          marginBottom: 36,
        }}>
          맵 기반 조합 추천, 또는 플레이스타일 분석으로 나에게 맞는 요원을 찾아보세요.
        </p>

        {/* 모드 탭 */}
        <div style={{ display: "flex", gap: 0, marginBottom: 48, borderBottom: "1px solid var(--border-dark)" }}>
          {[
            { key: "map",  label: "맵 기반 조합 추천" },
            { key: "quiz", label: "내 스타일로 요원 찾기" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setMode(tab.key)}
              style={{
                background: "none",
                border: "none",
                borderBottom: mode === tab.key ? "2px solid var(--accent)" : "2px solid transparent",
                padding: "10px 24px",
                marginBottom: -1,
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: mode === tab.key ? "var(--text-on-dark)" : "var(--text-on-dark-3)",
                cursor: "pointer",
                transition: "color 0.15s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 맵 기반 추천 */}
        {mode === "map" && (
          <>
            <RecommendForm onSubmit={handleSubmit} loading={loading} />
            {error && (
              <div style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                color: "var(--val-red-bright)",
                background: "rgba(255,70,85,0.08)",
                padding: "12px 16px",
                borderRadius: "var(--r-md)",
                border: "1px solid rgba(255,70,85,0.2)",
              }}>
                Error: {error}
              </div>
            )}
            {result && <ResultCard result={result} map={selectedMap} />}
          </>
        )}

        {/* 퀴즈 기반 추천 */}
        {mode === "quiz" && (
          quizResult
            ? <QuizResult result={quizResult} onReset={() => setQuizResult(null)} />
            : <Quiz onResult={setQuizResult} />
        )}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: "auto",
        padding: "24px var(--container-pad)",
        borderTop: "1px solid var(--border-dark)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        color: "var(--text-on-dark-3)",
        textAlign: "center",
      }}>
        An unofficial community intel hub. Not affiliated with or endorsed by Riot Games.
      </footer>
    </div>
  );
}
