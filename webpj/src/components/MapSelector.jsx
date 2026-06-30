import { useEffect, useState } from "react";
import { fetchMaps } from "../api/recommend";

export default function MapSelector({ selected, onSelect }) {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetchMaps().then(setMaps).catch(console.error);
  }, []);

  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: 16,
      }}>
        Select Map
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 12,
      }}>
        {maps.map((map) => {
          const isSelected = selected === map.name;
          return (
            <MapTile
              key={map.uuid}
              map={map}
              isSelected={isSelected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

function MapTile({ map, isSelected, onSelect }) {
  const [hover, setHover] = useState(false);
  const active = isSelected || hover;

  return (
    <div
      onClick={() => onSelect(map.name)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        clipPath: "var(--cut-10)",
        aspectRatio: "16 / 9",
        background: "var(--surface-dark)",
        boxShadow: isSelected
          ? "var(--glow-red)"
          : active
          ? "var(--shadow-md)"
          : "var(--inset-line)",
        transform: active ? "translateY(-2px)" : "none",
        transition: "all 0.2s ease",
        outline: isSelected ? "1.5px solid var(--accent)" : "none",
      }}
    >
      {/* 배경 이미지 */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: map.image_url
          ? `linear-gradient(180deg, rgba(15,25,35,0.2) 0%, rgba(15,25,35,0.75) 100%), url(${map.image_url}) center/cover`
          : `radial-gradient(120% 90% at 50% 0%, var(--ink-600), var(--ink-900))`,
        transform: active ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.35s ease",
      }} />

      {/* 선택 시 빨간 하단 선 */}
      <div style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        height: 3,
        width: isSelected ? "100%" : hover ? "60%" : "30%",
        background: "var(--accent)",
        transition: "width 0.3s ease",
      }} />

      {/* 맵 이름 */}
      <div style={{
        position: "absolute",
        left: 10,
        bottom: 10,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 15,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        lineHeight: 1,
        color: "var(--text-on-dark)",
      }}>
        {map.name}
      </div>

      {/* 선택됨 표시 */}
      {isSelected && (
        <div style={{
          position: "absolute",
          top: 8,
          right: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          background: "rgba(255,70,85,0.15)",
          padding: "3px 7px",
          borderRadius: "var(--r-sm)",
        }}>
          Selected
        </div>
      )}
    </div>
  );
}
