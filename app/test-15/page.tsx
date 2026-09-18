import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 15" };

export default function TestFifteenPage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} normalizeTouchScroll singlePinnedTrigger promotePinnedLayer />;
}
