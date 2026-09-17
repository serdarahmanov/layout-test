import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import styles from "./page.module.css";

type TestDefinition = {
  slug: string;
  title: string;
  summary: string;
};

function getTestDefinitions(): TestDefinition[] {
  const testsDirectory = path.join(process.cwd(), "docs", "test-cases");

  return fs
    .readdirSync(testsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^test-\d+\.md$/.test(entry.name))
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(testsDirectory, entry.name), "utf8");
      const lines = content.split(/\r?\n/);
      const title = lines.find((line) => line.startsWith("# "))?.slice(2).trim() ?? slug;
      const summary =
        lines
          .find((line) => line.startsWith("Runnable page:"))
          ?.replace("Runnable page:", "")
          .trim() ?? "Viewport layout experiment";

      return { slug, title, summary };
    })
    .sort((a, b) => Number(a.slug.replace("test-", "")) - Number(b.slug.replace("test-", "")));
}

export default function Home() {
  const tests = getTestDefinitions();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Mobile browser viewport lab</span>
        <h1>Layout behavior, made visible.</h1>
        <p>
          A growing collection of small experiments for understanding how browser chrome,
          safe-area insets, and viewport units affect mobile layouts.
        </p>
      </section>

      <section className={styles.tests} aria-labelledby="tests-heading">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Experiments</span>
          <h2 id="tests-heading">Available tests</h2>
        </div>

        <div className={styles.testList}>
          {tests.map((test, index) => (
            <Link className={styles.testCard} href={`/${test.slug}`} key={test.slug}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.testContent}>
                <span className={styles.testTitle}>{test.title}</span>
                <span className={styles.testSummary}>{test.summary}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
