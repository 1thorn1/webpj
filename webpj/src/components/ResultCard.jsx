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

        {/* 검색 근거 */}
        {result.sources && result.sources.length > 0 ? (
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-on-dark-3)",
              marginBottom: 8,
            }}>
              참고한 최신 자료
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {result.sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--text-on-dark-3)",
          }}>
            이 조합은 AI가 생성한 참고용 제안입니다. 실제 최신 승률·픽률은{" "}
            <a href="https://dak.gg/valorant" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>dak.gg</a>
            {" · "}
            <a href="https://www.vlr.gg" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>vlr.gg</a>
            에서 확인하세요.
          </div>
        )}
      </div>
    </div>
  );
}
