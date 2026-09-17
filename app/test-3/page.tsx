import ViewportTestShell from "../viewport-test-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout Test | 3",
};

export default function TestThreePage() {
  return (
    <ViewportTestShell
      testNumber={3}
      viewportUnit="svh"
      description="Small viewport case using 100svh. The layout should use the safe minimum height and avoid being hidden behind browser chrome."
    />
  );
}
