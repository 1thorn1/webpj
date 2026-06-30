import { Button } from "./ds/Button";

const ROLE_COLORS = {
  Duelist: "var(--accent)",
  Initiator: "var(--gold)",
  Controller: "var(--teal)",
  Sentinel: "var(--green)",
};

export default function QuizResult({ result, onReset }) {
  const { top_agents, explanation } = result;

  return (
    <div style={{ maxWidth: 700 }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 8,
        }}>
          Analysis Complete · Your Agents
        </div>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--text-on-dark)",
          lineHeight: 1,
        }}>
          {top_agents.length > 1 ? "공동 Best" : "Best Match"}
        </div>
      </div>

      {/* 요원 카드 */}
      <div style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 32,
      }}>
        {top_agents.map((agent) => {
          const roleColor = ROLE_COLORS[agent.role] || "var(--text-on-dark-2)";
          return (
            <div key={agent.name} style={{
              flex: "1 1 160px",
              maxWidth: 220,
              background: "var(--surface-dark)",
              clipPath: "var(--cut-14)",
              padding: "24px 20px",
              boxShadow: "var(--glow-red)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "rgba(255,70,85,0.15)",
                padding: "3px 8px",
                borderRadius: "var(--r-sm)",
              }}>
                {agent.score}pt
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: roleColor,
                marginBottom: 10,
              }}>
                {agent.role}
              </div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 32,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--text-on-dark)",
                lineHeight: 0.95,
              }}>
                {agent.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI 설명 */}
      <div style={{
        background: "var(--surface-dark)",
        clipPath: "var(--cut-14)",
        overflow: "hidden",
        marginBottom: 32,
      }}>
        <div style={{ height: 3, background: "var(--accent)" }} />
        <div style={{ padding: "24px 28px" }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 12,
          }}>
            Coach Intel
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.75,
            color: "var(--text-on-dark-2)",
            whiteSpace: "pre-wrap",
          }}>
            {explanation}
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" onDark onClick={onReset}>
        ← 다시 분석하기
      </Button>
    </div>
  );
}
