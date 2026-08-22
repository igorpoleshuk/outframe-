import type { Metadata } from "next";
import { PreviewApp } from "@/components/preview/preview-app";

export const metadata: Metadata = {
  title: "Превью предложения",
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PreviewApp id={id} />;
}
