import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 11" };

export default function TestElevenPage() {
  return <GsapLenisViewportTest mode="snapshot" />;
}
