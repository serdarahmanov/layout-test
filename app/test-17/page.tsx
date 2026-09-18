import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 17" };

export default function TestSeventeenPage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} syncTouchLenis singlePinnedTrigger promotePinnedLayer stableToolbarColor edgePaddedStage />;
}
