# Test 2

Status: Defined

Runnable page: `/test-2`

## Purpose

Use `100dvh` with the same header, main content, and footer layout as Test 1.

## Expected behavior

The layout should resize live as the browser toolbar hides and shows while scrolling.

The page includes three fixed-height scroll sections and a live indicator box sized with `100dvh`. Its measured pixel height should grow when the toolbar hides and shrink when the toolbar returns. The fixed HUD provides the numeric comparison.

## Procedure

1. Load the page and note the indicator height in the box and HUD.
2. Scroll through the filler sections until the browser toolbar hides.
3. Confirm that the indicator and its pixel label grow.
4. Scroll back toward the top and confirm that they shrink when the toolbar reappears.

## Comparison

Compare this page with [`test-1.md`](test-1.md) and [`test-3.md`](test-3.md).
