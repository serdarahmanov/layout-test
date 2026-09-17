import type { Metadata } from "next";
import SvhSnapshotTest from "../svh-snapshot-test";

export const metadata: Metadata = {
  title: "Layout Test | 9",
};

export default function TestNinePage() {
  return <SvhSnapshotTest />;
}
