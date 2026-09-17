import type { Metadata } from "next";
import ViewportTestShell from "../viewport-test-shell";

export const metadata: Metadata = {
  title: "Layout Test | 5",
};

export default function TestFivePage() {
  return (
    <ViewportTestShell
      testNumber={5}
      viewportUnit="vh"
      scrollable
      description="Extended 100vh case with several scroll sections. Use the longer scroll distance to watch how the mobile browser toolbar changes while the viewport-sized shell keeps its classic behavior."
    />
  );
}
