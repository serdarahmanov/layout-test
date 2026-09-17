import ViewportTestShell from "../viewport-test-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout Test | 2",
};

export default function TestTwoPage() {
  return (
    <ViewportTestShell
      testNumber={2}
      viewportUnit="dvh"
      description="Dynamic viewport case using 100dvh. The layout should resize live as the browser toolbar hides and shows during scrolling."
    />
  );
}
