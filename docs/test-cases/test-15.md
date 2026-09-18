# Test 15

Status: Defined

Runnable page: `/test-15`

## Purpose

Test 13 fixed the scrub stutter by giving Lenis `syncTouch: true` so it owns touch input directly. That introduced a new problem: as soon as the pinned stage engages, Safari's toolbar expands and stays expanded even after scrolling past the pin. The likely cause is that `syncTouch` intercepts (`preventDefault`s) the native touch-scroll gesture and drives scroll position itself, which removes the native scroll signal Safari's toolbar hide/show heuristic depends on — combined with the pin introducing a `position: fixed` element exactly when the toolbar issue starts.

GSAP ships a purpose-built fix for this class of bug: `ScrollTrigger.normalizeScroll()`. It normalizes touch scrolling itself (in a way integrated with ScrollTrigger's own pin/refresh cycle) and is documented to stop the mobile address bar from expanding/collapsing during scroll-driven pins.

Test 15 keeps everything from Test 13 (single merged trigger, promoted pinned layer, snapshot `svh`, no HUD) but replaces Lenis's `syncTouch` with `ScrollTrigger.normalizeScroll({ type: "touch" })` for touch input. Desktop is untouched — it still uses Lenis for wheel smoothing, since `normalizeScroll` is scoped to `type: "touch"` only, so it shouldn't fight with Lenis over wheel input.

## Expected behavior

Same setup as Test 13 (CSS `100svh` snapshot gating pin creation, single merged trigger, `will-change: transform` + `contain: layout paint style` on the pinned stage, no HUD), except touch devices no longer get a Lenis instance at all — `ScrollTrigger.normalizeScroll({ type: "touch" })` owns touch scrolling instead, and is killed (`ScrollTrigger.normalizeScroll(false)`) on unmount. If this fixes the root cause, the scrub should stay as smooth as Test 13 (no throttled-native-scroll stutter), and the toolbar should no longer get stuck expanded when the pin engages.

## Procedure

1. Open `/test-15` on the same mobile device used for Test 13.
2. Scroll into the pinned stage, including fast flicks, and watch whether the toolbar expands and stays expanded the way it did in Test 13.
3. Compare scrub smoothness with Test 13 during fast/flung scrolling.
4. If the toolbar behaves normally (collapses/expands with scroll direction as usual) and the scrub is still smooth, `normalizeScroll` is the fix. If the toolbar still sticks, the pin's `position: fixed` transition itself (not Lenis's `syncTouch`) is the trigger, and a different mitigation is needed.

## Comparison

Compare with [`test-13.md`](test-13.md), which is identical except it gives Lenis `syncTouch: true` on touch instead of using `ScrollTrigger.normalizeScroll()`.
