import type { Metadata } from "next";
import ViewportTestShell from "../viewport-test-shell";

export const metadata: Metadata = {
  title: "Layout Test | 7",
};

export default function TestSevenPage() {
  return (
    <ViewportTestShell
      testNumber={7}
      viewportUnit="dvh"
      pageMultiplier={2}
      fixedHeader
      description="A fixed-header page sized to 200dvh. The page height follows the currently visible viewport while the document scrolls beneath the persistent header."
    />
  );
}
