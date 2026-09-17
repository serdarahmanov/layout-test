"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ViewportHud from "./viewport-hud";
import styles from "./svh-snapshot-test.module.css";

type Snapshot = { time: string; svh: number };

function browserName() {
  const ua = navigator.userAgent;
  if (/CriOS/i.test(ua)) return "iOS Chrome";
  if (/FxiOS/i.test(ua)) return "iOS Firefox";
  if (/Safari/i.test(ua) && /iPhone|iPad|iPod/i.test(ua)) return "iOS Safari";
  return "Other browser";
}

export default function SvhSnapshotTest() {
  const hasSnapshotRef = useRef(false);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [browser, setBrowser] = useState("Detecting...");

  useEffect(() => {
    const snapshotCssSvh = () => {
      if (hasSnapshotRef.current) return;
      hasSnapshotRef.current = true;
      const probe = document.createElement("div");
      probe.style.cssText = "position:fixed;visibility:hidden;height:100svh;width:0;top:0;left:0;";
      document.body.appendChild(probe);
      const svh = Math.round(probe.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--snapshot-svh", `${svh}px`);
      probe.remove();
      setBrowser(browserName());
      setSnapshot({ time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }), svh });
    };
    const onLoad = () => requestAnimationFrame(snapshotCssSvh);
    window.addEventListener("load", onLoad, { once: true });
    if (document.readyState === "complete") onLoad();
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <main className={styles.page} style={snapshot ? ({ "--snapshot-svh": `${snapshot.svh}px` } as CSSProperties) : undefined}>
      <header className={styles.header}>
        <div><span className={styles.eyebrow}>Viewport lab / Test 9</span><h1>Snapshot the small viewport.</h1></div>
        <span className={styles.unit}>{browser}</span>
      </header>
      <section className={styles.intro}>
        <span className={styles.label}>CSS snapshot strategy</span>
        <p>After the page load event, a hidden probe lets the browser resolve <code>100svh</code> to pixels. That value is written once to a CSS custom property. Both viewboxes below use the static snapshot, with no scroll or resize recalculation.</p>
      </section>
      <section className={styles.objectGrid} aria-label="Static CSS svh snapshot viewboxes">
        <div className={styles.snapshotBox}><span className={styles.label}>Snapshot object A</span><strong>{snapshot?.svh ?? "..."} px</strong><code>height: var(--snapshot-svh)</code></div>
        <div className={`${styles.snapshotBox} ${styles.snapshotBoxAlt}`}><span className={styles.label}>Snapshot object B</span><strong>{snapshot?.svh ?? "..."} px</strong><code>height: var(--snapshot-svh)</code></div>
      </section>
      <section className={styles.log} aria-labelledby="log-heading">
        <div className={styles.logHeading}><span className={styles.label}>Initial reading</span><h2 id="log-heading">Frozen CSS snapshot</h2></div>
        {!snapshot ? <p>Waiting for the page to finish loading...</p> : <div className={styles.tableWrap}><table><thead><tr><th>Time</th><th>Source</th><th>Snapshot</th></tr></thead><tbody><tr><td>{snapshot.time}</td><td>100svh CSS probe</td><td>{snapshot.svh}px</td></tr></tbody></table></div>}
      </section>
      <div className={styles.scrollZone} aria-hidden="true">Scroll slowly to move the iOS toolbar. The two objects should keep their initial height.</div>
      <ViewportHud />
    </main>
  );
}
