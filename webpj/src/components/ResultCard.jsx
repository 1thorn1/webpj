export default function ResultCard({ result, map }) {
  return (
    <div style={{
      marginTop: 48,
      background: "var(--surface-dark)",
      clipPath: "var(--cut-14)",
      boxShadow: "var(--inset-line)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* 상단 빨간 선 */}
      <div style={{ height: 3, background: "var(--accent)", width: "100%" }} />

      <div style={{ padding: "32px 36px" }}>
        {/* 아이브로우 */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 8,
        }}>
          Composition Intel {map && `· ${map}`}
        </div>

        {/* 타이틀 */}
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--text-on-dark)",
          marginBottom: 24,
          lineHeight: 1,
        }}>
          Recommended Lineup
        </div>

        {/* AI 응답 */}
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.75,
          color: "var(--text-on-dark-2)",
          whiteSpace: "pre-wrap",
          borderLeft: "2px solid var(--border-dark)",
          paddingLeft: 20,
        }}>
          {result.reason}
        </div>
      </div>
    </div>
  );
}
