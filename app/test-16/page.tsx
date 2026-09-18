import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 16" };

export default function TestSixteenPage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} syncTouchLenis singlePinnedTrigger promotePinnedLayer stableToolbarColor />;
}
