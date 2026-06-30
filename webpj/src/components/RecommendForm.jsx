import { useState } from "react";
import MapSelector from "./MapSelector";
import { Button } from "./ds/Button";

export default function RecommendForm({ onSubmit, loading }) {
  const [map, setMap] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!map) return;
    onSubmit({ map, playstyle: "", existingAgents: [] });
  }

  return (
    <form onSubmit={handleSubmit}>
      <MapSelector selected={map} onSelect={setMap} />

      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!map || loading}
          chamfer
        >
          {loading ? "Analyzing..." : "Get Intel →"}
        </Button>

        {map && !loading && (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-on-dark-3)",
          }}>
            {map} selected
          </span>
        )}
      </div>
    </form>
  );
}
