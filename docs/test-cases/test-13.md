# Test 13

Status: Defined

Runnable page: `/test-13`

## Purpose

Test 12 kept Lenis on touch devices with `syncTouch: false`, which made Lenis a no-op pass-through on touch: it detects the touch input, marks itself as native, and returns without ever calling `scrollTo`. The scrub was still driven by however often the browser chose to deliver native `scroll` events, which are coalesced/throttled during a touch fling. A separate experiment that switched the pin to `pinType: "transform"` made the stutter worse, which showed the pin itself (native `position: fixed`, compositor-driven, no JS per frame) was never the bottleneck — the scrub *inside* the pin was.

Test 13 keeps Test 12's single merged trigger and promoted layer, and changes exactly one variable: Lenis is given `syncTouch: true` on touch devices, so it takes over touch input directly and drives scroll position from its own `requestAnimationFrame` loop instead of waiting on native scroll event delivery.

## Expected behavior

The page uses only the CSS `100svh` snapshot for the pinned stage and gates pin creation until `--snapshot-svh` is applied. There is no live `100svh` fallback in snapshot mode. Unlike Test 12, touch input is owned by Lenis (`syncTouch: true`) rather than passed through to native scrolling. The pin still uses GSAP's normal (fixed) pin behavior, keeps the track and orb animations merged into one timeline driven by one ScrollTrigger, and keeps `will-change: transform` and `contain: layout paint style` on the pinned stage. The page has no HUD.

## Procedure

1. Open `/test-13` on the same mobile device used for Test 11 and Test 12.
2. Scroll through the pinned stage repeatedly, including while the browser toolbar hides and appears, and including fast flicks that trigger momentum scrolling.
3. Compare the pin and scrub smoothness with Test 12, specifically during fast/flung scrolling where native scroll-event throttling would be most visible.
4. If Test 13 is smoother than Test 12, the scrub lag was caused by scroll-event delivery cadence on touch, and Lenis owning touch input directly (rather than native scroll relaying through a pass-through Lenis instance) is the fix. If the lag remains, the bottleneck is elsewhere (e.g. paint cost from `mix-blend-mode: multiply` on the orb, or GSAP's own touch-event handling overhead), and Lenis's rAF-driven interpolation isn't the limiting factor.

## Comparison

Compare with [`test-12.md`](test-12.md), which uses the same single-trigger, promoted-layer pin but leaves Lenis's `syncTouch` off (a no-op pass-through on touch). Also compare with [`test-11.md`](test-11.md) for the two-trigger, non-promoted, HUD-enabled baseline that showed the same stutter, which ruled out trigger count and layer promotion as the primary cause.
