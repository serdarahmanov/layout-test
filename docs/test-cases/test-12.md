# Test 12

Status: Defined

Runnable page: `/test-12`

## Purpose

Repeat Test 11 without the live viewport HUD to isolate HUD-related scroll overhead on mobile.

## Expected behavior

The page uses the CSS `100svh` snapshot, gates pin creation until the snapshot is applied, uses native scrolling on touch devices, and uses Lenis on desktop. The stage and viewport-based animation should behave like Test 11, but without React state updates or viewport measurements from the HUD during scrolling.

## Procedure

1. Open `/test-12` on the same mobile device used for Test 11.
2. Scroll through the pinned stage repeatedly, including while the browser toolbar hides and appears.
3. Compare the pin smoothness with Test 11.
4. If Test 12 is smoother, the live HUD was contributing to the lag. If the lag remains, inspect native ScrollTrigger updates, pinned compositing, and the orb transform separately.

## Comparison

Compare with [`test-11.md`](test-11.md), which uses the same animation and snapshot strategy with the live HUD enabled.
