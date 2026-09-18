import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 14" };

export default function TestFourteenPage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} syncTouchLenis singlePinnedTrigger promotePinnedLayer transparentStage />;
}
