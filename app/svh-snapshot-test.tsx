"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./svh-snapshot-test.module.css";

type Snapshot = {
  time: string;
  source: string;
  innerHeight: number;
  visualHeight: number;
  svh: number;
};

function browserName() {
  const ua = navigator.userAgent;
  if (/CriOS/i.test(ua)) return "iOS Chrome";
  if (/FxiOS/i.test(ua)) return "iOS Firefox";
  if (/Safari/i.test(ua) && /iPhone|iPad|iPod/i.test(ua)) return "iOS Safari";
  return "Other browser";
}

export default function SvhSnapshotTest() {
  const probeRef = useRef<HTMLDivElement>(null);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [safeHeight, setSafeHeight] = useState<number | null>(null);
  const [browser, setBrowser] = useState("Detecting…");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const probe = probeRef.current;
      if (!probe) return;

      const visualHeight = window.visualViewport?.height ?? window.innerHeight;
      const initialSnapshot: Snapshot = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        source: window.visualViewport ? "initial / visualViewport" : "initial / innerHeight fallback",
        innerHeight: Math.round(window.innerHeight),
        visualHeight: Math.round(visualHeight),
        svh: Math.round(probe.getBoundingClientRect().height),
      };

      setBrowser(browserName());
      setSnapshot(initialSnapshot);
      setSafeHeight(initialSnapshot.visualHeight);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main
      className={styles.page}
      style={safeHeight ? ({ "--js-svh": `${safeHeight}px` } as CSSProperties) : undefined}
    >
      <div ref={probeRef} className={styles.svhProbe} aria-hidden="true" />
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Viewport lab / Test 9</span>
          <h1>Snapshot the small viewport.</h1>
        </div>
        <span className={styles.unit}>{browser}</span>
      </header>

      <section className={styles.intro}>
        <span className={styles.label}>JS snapshot strategy</span>
        <p>
          iOS Safari and Chrome can disagree about when the small viewport changes. Capture the
          visible height in JavaScript, keep the smallest stable value, and use it as a layout
          fallback.
        </p>
      </section>

      <section className={styles.compare} aria-label="Native and JavaScript viewport comparison">
        <article className={styles.panel}>
          <span className={styles.label}>Native CSS</span>
          <strong>{snapshot?.svh ?? "…"} px</strong>
          <code>height: 100svh</code>
          <p>Browser-reported small viewport probe.</p>
        </article>
        <article className={`${styles.panel} ${styles.jsPanel}`}>
          <span className={styles.label}>JS snapshot</span>
          <strong>{safeHeight ?? "…"} px</strong>
          <code>height: var(--js-svh)</code>
          <p>Smallest visual viewport observed this session.</p>
        </article>
      </section>

      <section className={styles.log} aria-labelledby="log-heading">
        <div className={styles.logHeading}>
          <span className={styles.label}>Event log</span>
          <h2 id="log-heading">Latest snapshots</h2>
        </div>
        {!snapshot ? <p>Waiting for the initial viewport reading…</p> : (
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Time</th><th>Event</th><th>Visual</th><th>svh</th></tr></thead>
              <tbody><tr>
                <td>{snapshot.time}</td><td>{snapshot.source}</td><td>{snapshot.visualHeight}px</td><td>{snapshot.svh}px</td>
              </tr></tbody>
            </table>
          </div>
        )}
      </section>

      <div className={styles.scrollZone} aria-hidden="true">Scroll slowly to move the iOS toolbar and create more snapshots.</div>
    </main>
  );
}
