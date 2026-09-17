import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 10" };

export default function TestTenPage() {
  return <GsapLenisViewportTest mode="live" />;
}
