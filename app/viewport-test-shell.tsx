import ViewportHeightIndicator from "./viewport-height-indicator";
import ViewportHud from "./viewport-hud";
import styles from "./viewport-test-shell.module.css";

type ViewportUnit = "vh" | "dvh" | "svh";

type ViewportTestShellProps = {
  testNumber: number;
  viewportUnit: ViewportUnit;
  description: string;
  comparison?: boolean;
  scrollable?: boolean;
  pageMultiplier?: 1 | 2;
  fixedHeader?: boolean;
};

export default function ViewportTestShell({
  testNumber,
  viewportUnit,
  description,
  comparison = false,
  scrollable = false,
  pageMultiplier = 1,
  fixedHeader = false,
}: ViewportTestShellProps) {
  const hasLiveIndicator = viewportUnit !== "vh";
  const hasScrollContent = hasLiveIndicator || scrollable;

  return (
    <div className={`${styles.page} ${styles[viewportUnit]} ${styles[`height${pageMultiplier}`]}`}>
      <header className={`${styles.header} ${fixedHeader ? styles.fixedHeader : ""}`}>
        <div>
          <span className={styles.eyebrow}>Viewport lab / Test {testNumber}</span>
          <h1>Header + footer baseline</h1>
        </div>
        <span className={styles.unit}>
          {comparison ? "100dvh vs 100svh" : `100${viewportUnit}`}
        </span>
      </header>

      <main className={`${styles.main} ${hasLiveIndicator ? styles.mainScrollable : ""}`}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Current experiment</span>
          <p>{description}</p>
          <p className={styles.instruction}>
            Scroll slowly while watching the browser toolbar and the fixed HUD. Compare whether
            the footer stays visible, moves, or becomes covered.
          </p>
        </div>

        {hasScrollContent ? (
          <>
            {hasLiveIndicator && comparison ? (
              <div className={styles.comparison} aria-label="Dynamic and small viewport comparison">
                <ViewportHeightIndicator viewportUnit="dvh" />
                <ViewportHeightIndicator viewportUnit="svh" />
              </div>
            ) : hasLiveIndicator ? (
              <ViewportHeightIndicator viewportUnit={viewportUnit} />
            ) : null}
            <section className={styles.filler} aria-label="Scroll section one">
              <span>Scroll section 01</span>
              <strong>Toolbar movement needs real scroll distance.</strong>
            </section>
            <section className={`${styles.filler} ${styles.fillerAlt}`} aria-label="Scroll section two">
              <span>Scroll section 02</span>
              <strong>Watch the indicator height and HUD values.</strong>
            </section>
            <section className={styles.filler} aria-label="Scroll section three">
              <span>Scroll section 03</span>
              <strong>Scroll back up and compare the toolbar state.</strong>
            </section>
          </>
        ) : (
          <div className={styles.baselineSpacer} aria-hidden="true" />
        )}
      </main>

      <footer className={styles.footer}>
        <span>/test-{testNumber}</span>
        <span>{comparison ? "Viewport height: 100dvh vs 100svh" : `Viewport height: 100${viewportUnit}`}</span>
      </footer>

      <ViewportHud />
    </div>
  );
}
