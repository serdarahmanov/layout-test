import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 13" };

export default function TestThirteenPage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} syncTouchLenis singlePinnedTrigger promotePinnedLayer />;
}
