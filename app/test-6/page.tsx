import type { Metadata } from "next";
import ViewportTestShell from "../viewport-test-shell";

export const metadata: Metadata = {
  title: "Layout Test | 6",
};

export default function TestSixPage() {
  return (
    <ViewportTestShell
      testNumber={6}
      viewportUnit="svh"
      pageMultiplier={2}
      fixedHeader
      description="A fixed-header page sized to 200svh. The small viewport height stays tied to the browser’s minimum visible viewport while the document scrolls beneath the header."
    />
  );
}
