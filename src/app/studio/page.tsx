import type { Metadata } from "next";
import { Suspense } from "react";
import { StudioApp } from "@/components/studio/studio-app";

export const metadata: Metadata = {
  title: "Студия",
};

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-pine-900 text-pine-200">
          Собираем студию…
        </div>
      }
    >
      <StudioApp />
    </Suspense>
  );
}
