import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Outframe — КП, которое можно отправить сегодня";

export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), "src/app/fonts/manrope-semibold.ttf"));

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
          fontFamily: "Manrope",
          padding: 72,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 280,
            height: 280,
            background: "#c8f542",
            opacity: 0.16,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: "2px solid #e8f0ea",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 8,
            }}
          >
            <div style={{ width: 14, height: 14, background: "#c8f542" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>Outframe</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 62, fontWeight: 600, lineHeight: 1.05, maxWidth: 920 }}>
            КП, которое можно отправить сегодня
          </div>
          <div style={{ fontSize: 28, color: "#c8f542" }}>
            Scope · цена · срок · terms · ссылка клиенту
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Manrope", data: font, weight: 600, style: "normal" }],
    },
  );
}
