# Test 10

Status: Defined

Runnable page: `/test-10`

## Purpose

Provide a deliberately unstable Lenis + GSAP ScrollTrigger control case using live `svh` and `innerHeight` values.

## Expected behavior

The pinned stage and viewport-based orb animation may jump, resize, or change timing when mobile browser chrome moves. This page creates its pin immediately and refreshes on every resize so it demonstrates the failure mode.

## Procedure

1. Open the page on a mobile browser.
2. Scroll slowly through the pinned stage while the HUD shows live viewport values.
3. Hide and reveal the browser toolbar during the pin.
4. Watch for pin-start flashes, stage height changes, orb jumps, or a changed release point.
5. Compare with [`test-11.md`](test-11.md).
