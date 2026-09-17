"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./viewport-height-indicator.module.css";

type IndicatorUnit = "dvh" | "svh";

export default function ViewportHeightIndicator({ viewportUnit }: { viewportUnit: IndicatorUnit }) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setHeight(indicatorRef.current?.getBoundingClientRect().height ?? null);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={indicatorRef} className={`${styles.indicator} ${styles[viewportUnit]}`}>
      <span>Live {`100${viewportUnit}`}</span>
      <strong>{height === null ? "..." : `${Math.round(height)}px`}</strong>
    </div>
  );
}
