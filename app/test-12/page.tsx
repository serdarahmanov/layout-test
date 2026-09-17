import type { Metadata } from "next";
import GsapLenisViewportTest from "../gsap-lenis-viewport-test";

export const metadata: Metadata = { title: "Layout Test | 12" };

export default function TestTwelvePage() {
  return <GsapLenisViewportTest mode="snapshot" showHud={false} experimentalMobilePin />;
}
