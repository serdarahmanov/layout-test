import type { Metadata } from "next";
import ViewportTestShell from "../viewport-test-shell";

export const metadata: Metadata = {
  title: "Layout Test | 8",
};

export default function TestEightPage() {
  return (
    <ViewportTestShell
      testNumber={8}
      viewportUnit="vh"
      pageMultiplier={2}
      fixedHeader
      description="A fixed-header page sized to 200vh. Compare its classic viewport height with the 200svh and 200dvh versions while scrolling beneath the same fixed header."
    />
  );
}
