# Test 17

Status: Defined

Runnable page: `/test-17`

## Purpose

Test 16 unified the pinned stage's background with `<html>`/`<body>` so that whichever element Safari's toolbar-tint logic samples, the color would be the same. It turned out not to matter which element Safari nominally samples: the stage's own background is never actually painted on screen, because `.track`/`.panel` (`width: 300vw` / `flex: 0 0 100vw`, `min-height: 100%`) fully cover the stage at all times. Safari's tint logic samples real rendered pixels near the viewport edge, and those pixels always belong to the first panel's content background, not the stage's declared-but-occluded one.

Test 17 keeps Test 16's setup (`syncTouch` Lenis, single merged trigger, promoted pinned layer, stable `<html>`/`<body>` background, no HUD) and adds one change: a small `padding: 3px 0` on the pinned stage (`.edgePaddedStage`). Because `box-sizing: border-box` is applied globally, this shrinks `.track`'s `height: 100%` to fit inside the padded content box, genuinely exposing a 3px sliver of the stage's own background at the very top and bottom edges instead of being fully occluded by the panel. That sliver is real painted pixels, and it's colored with the same `--paper` value that Test 16 already pushed onto `<html>`/`<body>`.

## Expected behavior

Same setup as Test 16, plus the pinned stage now has a visible (if thin) strip of its own background at the top and bottom edges. If Safari's edge-pixel sampling picks up that sliver instead of the panel's background, the toolbar tint should match the stable `--paper` color used everywhere else on the page, rather than the panel's arbitrary color.

## Procedure

1. Open `/test-17` on the same mobile device used for Test 13-16.
2. Scroll into the pinned stage repeatedly, including while the toolbar hides/shows and while flicking fast.
3. Watch the toolbar's tint color and the thin top/bottom strips on the stage.
4. If the toolbar now tints to the stable `--paper` color instead of a panel color, the 3px sliver was enough for Safari's sampling to find. If it still samples the panel, either the sliver needs to be taller (matching more of the actual safe-area height Safari samples from) or Safari isn't sampling the topmost few pixels at all.

## Comparison

Compare with [`test-16.md`](test-16.md) (same background unification, no exposed stage background) and [`test-13.md`](test-13.md) (original colored stage, fully occluded either way).
