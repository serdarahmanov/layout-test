"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ViewportHud from "./viewport-hud";
import styles from "./gsap-lenis-viewport-test.module.css";

gsap.registerPlugin(ScrollTrigger);

type TestMode = "live" | "snapshot";

function snapshotCssSvh() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;visibility:hidden;height:100svh;width:0;top:0;left:0;";
  document.body.appendChild(probe);
  const height = Math.round(probe.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--snapshot-svh", `${height}px`);
  probe.remove();
  return height;
}

export default function GsapLenisViewportTest({ mode, showHud = true, enableTouchLenis = false, singlePinnedTrigger = false, promotePinnedLayer = false, syncTouchLenis = false, transparentStage = false }: { mode: TestMode; showHud?: boolean; enableTouchLenis?: boolean; singlePinnedTrigger?: boolean; promotePinnedLayer?: boolean; syncTouchLenis?: boolean; transparentStage?: boolean }) {
  const stageRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(0);
  const lastHeightRef = useRef(0);
  const [snapshotHeight, setSnapshotHeight] = useState<number | null>(null);

  const isSnapshotMode = mode === "snapshot";
  const ready = !isSnapshotMode || snapshotHeight !== null;

  useEffect(() => {
    if (!isSnapshotMode) return;

    const captureAfterLoad = () => {
      requestAnimationFrame(() => {
        setSnapshotHeight(snapshotCssSvh());
      });
    };

    window.addEventListener("load", captureAfterLoad, { once: true });
    if (document.readyState === "complete") captureAfterLoad();
    return () => window.removeEventListener("load", captureAfterLoad);
  }, [isSnapshotMode]);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;
    let resizeTimer = 0;
    let combinedTimeline: ReturnType<typeof gsap.timeline> | null = null;
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const useLenis = enableTouchLenis || syncTouchLenis || !isSnapshotMode || !isTouchDevice;
    const lenis = useLenis ? new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: syncTouchLenis }) : null;
    const stage = stageRef.current;
    const track = trackRef.current;
    const orb = orbRef.current;
    if (!stage || !track || !orb) return () => lenis?.destroy();
    if (isSnapshotMode) ScrollTrigger.config({ ignoreMobileResize: true });

    const setup = () => {
      if (cancelled) return;
      const viewportHeight = isSnapshotMode ? snapshotHeight ?? 0 : window.innerHeight;
      const horizontalDistance = Math.max(track.scrollWidth - window.innerWidth, 0);
      const pinDistance = viewportHeight * 2;

      gsap.set(track, { x: 0 });
      gsap.set(orb, { y: 0 });
      if (singlePinnedTrigger) {
        combinedTimeline = gsap.timeline({ paused: true });
        combinedTimeline
          .to(track, { x: () => -horizontalDistance, ease: "none" }, 0)
          .to(orb, { y: viewportHeight * 0.55, ease: "none" }, 0);
        ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          scrub: true,
          animation: combinedTimeline,
          invalidateOnRefresh: true,
        });
      } else {
        gsap.to(track, {
          x: () => -horizontalDistance,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: `+=${pinDistance}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(orb, {
          y: viewportHeight * 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: `+=${pinDistance}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthChanged = Math.abs(width - lastWidthRef.current) > 1;
      const heightChanged = Math.abs(height - lastHeightRef.current) > 1;
      lastWidthRef.current = width;
      lastHeightRef.current = height;

      if (!isSnapshotMode) {
        // Intentionally unstable control: every height change can remeasure a pin.
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
        return;
      }

      const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (!widthChanged && (isMobile || !heightChanged)) return;
      setSnapshotHeight(snapshotCssSvh());
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
      }, 80);
    };

    const onOrientationChange = () => {
      if (isSnapshotMode) setSnapshotHeight(snapshotCssSvh());
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    };

    lastWidthRef.current = window.innerWidth;
    lastHeightRef.current = window.innerHeight;
    setup();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientationChange);

    const ticker = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }
    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
      if (lenis) gsap.ticker.remove(ticker);
      lenis?.destroy();
      combinedTimeline?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === stage) trigger.kill();
      });
    };
  }, [enableTouchLenis, isSnapshotMode, promotePinnedLayer, ready, singlePinnedTrigger, snapshotHeight, syncTouchLenis]);

  const pageStyle = snapshotHeight
    ? ({ "--snapshot-svh": `${snapshotHeight}px` } as CSSProperties)
    : undefined;

  return (
    <main className={`${styles.page} ${isSnapshotMode ? styles.snapshot : styles.live}`} style={pageStyle}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Viewport lab / {isSnapshotMode ? "Test 11" : "Test 10"}</span>
          <h1>{isSnapshotMode ? "Pins that wait." : "Pins that chase."}</h1>
        </div>
        <span className={styles.badge}>{syncTouchLenis ? "snapshot + syncTouch Lenis" : enableTouchLenis ? "snapshot + touch Lenis" : isSnapshotMode ? "snapshot + native/Lenis" : "live svh + Lenis"}</span>
      </header>

      <section className={styles.explainer}>
        <span className={styles.label}>{isSnapshotMode ? "Skill strategy" : "Control case"}</span>
        <p>{isSnapshotMode
          ? syncTouchLenis
            ? "The CSS-native svh value is captured after load and paint. Lenis takes over touch input directly (syncTouch) and drives scroll position from its own rAF loop, instead of the scrub waiting on throttled native scroll events."
            : enableTouchLenis
              ? "The CSS-native svh value is captured after load and paint. This experiment keeps Lenis on touch devices while testing the normal GSAP pin behavior."
              : "The CSS-native svh value is captured after load and paint. Pin creation waits for that value. Desktop uses Lenis; touch devices use native scrolling, while mobile toolbar resize is ignored."
          : "This control deliberately mixes live 100svh, innerHeight-based animation distances, immediate pin creation, and refreshes on every resize. Use it to expose toolbar-related jumps."}</p>
        <span className={styles.readout}>{snapshotHeight ? `Frozen height: ${snapshotHeight}px` : "Waiting for viewport setup..."}</span>
      </section>

      <section ref={stageRef} className={`${styles.stage} ${promotePinnedLayer ? styles.promotedStage : ""} ${transparentStage ? styles.transparentStage : ""}`} aria-label="Lenis and GSAP pinned viewport test">
        <div ref={trackRef} className={styles.track}>
          <article className={styles.panel}><span>01 / pin</span><strong>Scroll the stage.</strong><small>{isSnapshotMode ? "Native touch / Lenis desktop" : "Lenis + ScrollTrigger"}</small></article>
          <article className={`${styles.panel} ${styles.panelBlue}`}><span>02 / measure</span><strong>Watch the HUD.</strong><small>{isSnapshotMode ? "Static section height" : "Live svh section height"}</small></article>
          <article className={`${styles.panel} ${styles.panelOrange}`}><span>03 / compare</span><strong>Toolbar movement.</strong><small>{isSnapshotMode ? "No mobile refresh" : "Refresh on resize"}</small></article>
        </div>
        <div ref={orbRef} className={styles.orb} aria-hidden="true" />
        <span className={styles.stageNote}>Pinned stage / scroll distance = 2 viewport heights</span>
      </section>

      <section className={styles.after}><span className={styles.label}>After the pin</span><h2>Did the layout stay coherent?</h2><p>Scroll back through the stage and compare the pin start, release, and viewport-based motion.</p></section>
      {showHud ? <ViewportHud /> : null}
    </main>
  );
}
