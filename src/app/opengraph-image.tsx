import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1a16",
          color: "#e8f0ea",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: "2px solid #e8f0ea",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 8,
            }}
          >
            <div style={{ width: 12, height: 12, background: "#c8f542" }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>Outframe</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, maxWidth: 900 }}>
            Proposals that clients actually finish reading.
          </div>
          <div style={{ fontSize: 28, color: "#c8f542" }}>Scope · price · timeline · terms</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
