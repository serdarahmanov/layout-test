# Test 4

Status: Defined

Runnable page: `/test-4`

## Purpose

Compare `100dvh` and `100svh` directly on the same page using one scroll gesture.

## Expected behavior

The `100dvh` box should grow when the browser toolbar hides and shrink when it returns. The `100svh` box should remain flat, making the difference visible without switching pages or remembering measurements.

## Procedure

1. Load the page with the toolbar expanded and note both box heights in the fixed HUD and inside the boxes.
2. Scroll through the filler sections until the toolbar hides.
3. Watch the two boxes at the same time: the dynamic box should change while the small viewport box stays stable.
4. Scroll back up and confirm the dynamic box returns toward its original height.
