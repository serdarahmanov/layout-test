import styles from "./viewport-test-shell.module.css";

type ViewportUnit = "vh" | "dvh" | "svh";

type ViewportTestShellProps = {
  testNumber: number;
  viewportUnit: ViewportUnit;
  description: string;
};

export default function ViewportTestShell({
  testNumber,
  viewportUnit,
  description,
}: ViewportTestShellProps) {
  return (
    <div className={`${styles.page} ${styles[viewportUnit]}`}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Viewport lab · Test {testNumber}</span>
          <h1>Header + footer baseline</h1>
        </div>
        <span className={styles.unit}>100{viewportUnit}</span>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Current experiment</span>
          <p>{description}</p>
          <p className={styles.instruction}>
            Scroll slowly while watching the browser toolbar. Compare whether the footer stays
            visible, moves, or becomes covered.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>/test-{testNumber}</span>
        <span>Viewport height: 100{viewportUnit}</span>
      </footer>
    </div>
  );
}
