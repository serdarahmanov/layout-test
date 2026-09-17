import ViewportTestShell from "../viewport-test-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout Test | 1",
};

export default function TestOnePage() {
  return (
    <ViewportTestShell
      testNumber={1}
      viewportUnit="vh"
      description="Baseline “broken” case using 100vh. On mobile browsers, the footer may be cut off or overflow when the toolbar is visible."
    />
  );
}
