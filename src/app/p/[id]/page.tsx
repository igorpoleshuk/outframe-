import type { Metadata } from "next";
import { Suspense } from "react";
import { PreviewApp } from "@/components/preview/preview-app";
import { DEMO_ID } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (id === DEMO_ID) {
    return {
      title: "Пример КП",
      description: "Публичный пример коммерческого предложения Outframe. Можно открыть с любого устройства.",
    };
  }
  return {
    title: "Превью предложения",
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-pine-900 text-pine-200">
          Открываем превью…
        </div>
      }
    >
      <PreviewApp id={id} />
    </Suspense>
  );
}
