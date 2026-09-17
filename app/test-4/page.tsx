import type { Metadata } from "next";
import ViewportTestShell from "../viewport-test-shell";

export const metadata: Metadata = {
  title: "Layout Test | 4",
};

export default function TestFourPage() {
  return (
    <ViewportTestShell
      testNumber={4}
      viewportUnit="dvh"
      comparison
      description="Direct comparison of 100dvh and 100svh. Both boxes share this page and the same scroll gesture, so their height behavior can be watched side by side."
    />
  );
}
