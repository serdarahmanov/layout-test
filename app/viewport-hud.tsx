"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./viewport-hud.module.css";

type ViewportReadings = {
  innerHeight: number | null;
  visualHeight: number | null;
  dvh: number | null;
  svh: number | null;
  lvh: number | null;
};

const initialReadings: ViewportReadings = {
  innerHeight: null,
  visualHeight: null,
  dvh: null,
  svh: null,
  lvh: null,
};

function format(value: number | null) {
  return value === null ? "..." : `${Math.round(value)}px`;
}

export default function ViewportHud() {
  const [readings, setReadings] = useState(initialReadings);
  const dvhRef = useRef<HTMLSpanElement>(null);
  const svhRef = useRef<HTMLSpanElement>(null);
  const lvhRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      setReadings({
        innerHeight: window.innerHeight,
        visualHeight: window.visualViewport?.height ?? null,
        dvh: dvhRef.current?.getBoundingClientRect().height ?? null,
        svh: svhRef.current?.getBoundingClientRect().height ?? null,
        lvh: lvhRef.current?.getBoundingClientRect().height ?? null,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <aside className={styles.hud} aria-label="Live viewport measurements">
      <strong>Live viewport</strong>
      <dl>
        <div><dt>innerHeight</dt><dd>{format(readings.innerHeight)}</dd></div>
        <div><dt>visualVP height</dt><dd>{format(readings.visualHeight)}</dd></div>
        <div><dt>dvh</dt><dd>{format(readings.dvh)}</dd></div>
        <div><dt>svh</dt><dd>{format(readings.svh)}</dd></div>
        <div><dt>lvh</dt><dd>{format(readings.lvh)}</dd></div>
      </dl>
      <span ref={dvhRef} className={styles.measureDvh} aria-hidden="true" />
      <span ref={svhRef} className={styles.measureSvh} aria-hidden="true" />
      <span ref={lvhRef} className={styles.measureLvh} aria-hidden="true" />
    </aside>
  );
}
