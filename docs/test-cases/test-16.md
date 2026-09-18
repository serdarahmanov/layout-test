# Test 16

Status: Defined

Runnable page: `/test-16`

## Purpose

Test 15 tried to fix the stuck-toolbar-color problem by locking Safari's toolbar state with `ScrollTrigger.normalizeScroll()`, swapping out the `syncTouch` Lenis setup Test 13 relied on for a smooth scrub. That felt too artificial a fix for a color problem, and it's a dead end anyway: there is no reliable API to force the toolbar to stay permanently expanded from a website — `normalizeScroll()` can only lock whatever state it's already in.

Research into current Safari (26) turned up a more direct cause and a more direct fix. Safari 26 dropped support for the `theme-color` meta tag; it now derives the toolbar/tab-bar tint directly from a `background-color` — first from a fixed-position element near the viewport edge if one is present, falling back to `<html>`/`<body>` otherwise. There's a filed WebKit bug where that fixed-element sampling can get stuck. Our pinned stage is exactly that fixed-position element, and it previously had its own background color (`#d8d1c4`) that didn't match the page's `--paper` background or `<body>`'s global background (`--background: #f1faee` from `globals.css`) — three different colors competing for the same toolbar tint.

Test 16 keeps Test 13's setup exactly (`syncTouch` Lenis, single merged trigger, promoted pinned layer, no HUD) — no `normalizeScroll`. Instead of fighting *which* element Safari samples, it makes the color the same no matter which one gets picked: the pinned stage's background is set to the page's `--paper` color (`.stableStage`), and that same resolved color is pushed onto `<html>`/`<body>` for the lifetime of the pinned page (restored on unmount). Whether Safari tints from the fixed stage or falls back to body, it should land on the same color.

## Expected behavior

Same setup as Test 13 (CSS `100svh` snapshot gating pin creation, `syncTouch: true` Lenis on touch, single merged trigger, `will-change: transform` + `contain: layout paint style` on the pinned stage, no HUD). The pinned stage no longer uses its own `#d8d1c4` background — it uses the page's `--paper` color instead, and `<html>`/`<body>` are pushed to that same computed color while the page is mounted. This doesn't try to keep the toolbar open or locked in any particular state; it only tries to make whatever color Safari tints it with consistent, so a "stuck" sample (from the fixed stage) is visually indistinguishable from a correct one (from `body`).

## Procedure

1. Open `/test-16` on the same mobile device used for Test 13/14/15.
2. Scroll into the pinned stage repeatedly, including while the toolbar hides/shows and while flicking fast.
3. Watch the safe-area strips above and below the pinned stage, and the toolbar's own tint color, for any mismatched or stuck color the way Test 13 showed.
4. If the strips and toolbar now stay a single consistent color regardless of pin state, unifying the background across `body` and the fixed stage was enough. If a mismatched color still appears, the WebKit fixed-element-sampling bug is doing something more specific than a body/stage color mismatch (e.g. sampling stale panel colors from inside the track), and the panels' own backgrounds need the same treatment.

## Comparison

Compare with [`test-13.md`](test-13.md) (same scroll/pin setup, original stage background), [`test-14.md`](test-14.md) (removed the stage background entirely instead of unifying it), and [`test-15.md`](test-15.md) (tried to lock toolbar state via `normalizeScroll` instead of addressing color).
