# Learning: Document Scrolling vs. Inner Scrolling

## What changed

The test pages now let the document scroll naturally. The viewport shell no longer has `overflow: auto`.

The relevant element is the shared shell:

```tsx
<div className={`${styles.page} ${styles[viewportUnit]}`}>
```

Previously, its CSS contained:

```css
.page {
  overflow: auto;
}
```

That made `.page` an inner scroll container. The page structure was effectively:

```text
body
└── .page  ← scrolling happened here
    ├── header
    ├── main
    └── footer
```

Now `.page` does not create its own scrolling area. Overflow continues to the document, so the browser page itself can scroll:

```text
body  ← scrolling happens here
└── .page
    ├── header
    ├── main
    └── footer
```

## Why this matters on Safari

Safari’s mobile browser toolbar responds primarily to document scrolling. Scrolling a nested element such as `.page` does not reliably trigger the toolbar to hide or reappear.

Allowing the document to scroll makes these viewport tests behave more like ordinary real-world websites and gives Safari the root-page scroll activity it expects.

## When inner scrolling is useful

Inner scroll containers are still appropriate for focused UI regions such as chat panels, dashboard panes, sidebars, and modal dialogs. They are usually not the best default for a normal content page when browser toolbar behavior is part of the experiment.
