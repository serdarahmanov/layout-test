# Test 14

Status: Defined

Runnable page: `/test-14`

## Purpose

Test 13's pinned stage carries its own background color (`.stage { background: #d8d1c4; }`). Once the stage pins to `position: fixed` at a height frozen from the `--snapshot-svh` snapshot, that fixed, compositor-promoted box can land offset from the toolbar-driven safe-area strips above and below it, painting its background color over part of the header and the `.after` section instead of leaving them visible.

Test 14 is identical to Test 13 except the pinned stage itself has no background color (`background: none`); only the content inside it (the panels, which keep their own backgrounds) is colored. This isolates whether the stray color in the safe-area strips comes from the stage's own background painting over neighboring content, or from something else (e.g. the panels/track).

## Expected behavior

Same setup as Test 13: CSS `100svh` snapshot gating pin creation, `syncTouch: true` Lenis on touch, single merged trigger, `will-change: transform` and `contain: layout paint style` on the pinned stage, no HUD. The only difference is `.stage` has no background, so wherever the pinned stage's fixed box does not exactly align with its reserved slot, the page background (or whatever is beneath) should show through instead of a solid color — unless the panels themselves extend into that space, which would point to the track/panels rather than the stage background.

## Procedure

1. Open `/test-14` on the same mobile device used for Test 13.
2. Scroll into the pinned stage and watch the top/bottom safe-area strips as the browser toolbar hides and appears.
3. Compare with Test 13: if the strips no longer turn solid color and instead show the page background (or the content behind), the stage's own background was the source of the stuck color. If a color still appears there, it's coming from the panels/track/orb rather than the stage.

## Comparison

Compare with [`test-13.md`](test-13.md), which is identical except the pinned stage keeps its `#d8d1c4` background.
