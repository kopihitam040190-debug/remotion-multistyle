import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import type { CSSProperties } from "react";

type StyleKey = "flat" | "pixel" | "chalk" | "glow" | "dankoe" | "comic";

const STYLES: Record<StyleKey, CSSProperties> = {
  flat: { background: "#FFE8D6", color: "#222" },
  pixel: { background: "#A8E6CF", color: "#111", fontFamily: "monospace" },
  chalk: { background: "#2B2B2B", color: "#fff" },
  glow: { background: "#000", color: "#00FFD1" },
  dankoe: { background: "#F5F5F0", color: "#111" },
  comic: { background: "#FFEB3B", color: "#111" },
};

const SCENES = [
  { style: "flat" as StyleKey, emoji: "🚗", title: "MOBIL TERBANG", sub: "Kenapa kita masih macet?" },
  { style: "pixel" as StyleKey, emoji: "🐱", title: "MASALAHNYA", sub: "Bukan mesinnya yang jelek" },
  { style: "chalk" as StyleKey, emoji: "✏️", title: "SOLUSINYA", sub: "Aturan, baterai, suara bising" },
  { style: "glow" as StyleKey, emoji: "👻", title: "PROSESNYA", sub: "Bayangkan 1000 mobil jatuh bareng" },
  { style: "dankoe" as StyleKey, emoji: "💡", title: "MANFAATNYA", sub: "Kota pertama pasti viral" },
  { style: "comic" as StyleKey, emoji: "😂", title: "JADI GIMANA?", sub: "Follow buat part 2" },
];

export const MultiStyle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SCENE_LENGTH = 150;
  const index = Math.min(Math.floor(frame / SCENE_LENGTH), SCENES.length - 1);
  const scene = SCENES[index];
  const localFrame = frame % SCENE_LENGTH;
  const pop = spring({ frame: localFrame, fps, config: { damping: 12 } });
  const opacity = interpolate(localFrame, [0, 15, 135, 150], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        ...STYLES[scene.style],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 60,
        opacity,
      }}
    >
      <div style={{ fontSize: 180, transform: `scale(${pop})` }}>{scene.emoji}</div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          lineHeight: 1.1,
          marginTop: 20,
          transform: `scale(${pop})`,
        }}
      >
        {scene.title}
      </div>
      <div style={{ fontSize: 36, marginTop: 20, opacity: 0.85 }}>{scene.sub}</div>
      <div style={{ position: "absolute", bottom: 60, fontSize: 24, opacity: 0.6 }}>
        Scene {index + 1} / 6 - {scene.style}
      </div>
    </AbsoluteFill>
  );
};