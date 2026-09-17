# Test 12

Status: Defined

Runnable page: `/test-12`

## Purpose

Repeat Test 11 without the live viewport HUD to isolate HUD-related scroll overhead on mobile.

## Expected behavior

The page uses the CSS `100svh` snapshot and gates pin creation until the snapshot is applied. Unlike Test 11, it keeps Lenis enabled on touch devices while using GSAP's normal pin behavior. The page has no HUD, so it isolates the effect of touch Lenis without the transform-pin experiment.

## Procedure

1. Open `/test-12` on the same mobile device used for Test 11.
2. Scroll through the pinned stage repeatedly, including while the browser toolbar hides and appears.
3. Compare the pin smoothness with Test 11.
4. Compare the result with Test 11. If Test 12 is smoother, touch Lenis may be helping. If the lag remains, inspect the pinned compositing and scrubbed transforms separately.

## Comparison

Compare with [`test-11.md`](test-11.md), which uses the same animation and snapshot strategy with the live HUD enabled.
