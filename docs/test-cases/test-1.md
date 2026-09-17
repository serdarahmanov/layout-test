# Test 1

Status: Defined

Runnable page: `/test-1`

## Purpose

Establish the classic mobile viewport-height problem using `100vh`.

## Expected behavior

When the browser toolbar is visible, the layout may be taller than the visible screen. The footer can appear cut off, covered, or require unexpected overflow. Scroll and compare the layout again after the toolbar hides.

The page includes a fixed live HUD showing `innerHeight`, `visualViewport.height`, and measured `dvh`, `svh`, and `lvh` values. The page has an 8px spacer so a tiny scroll gesture can trigger toolbar movement.

## Procedure

1. Load the page with the toolbar expanded and note the footer position.
2. Check whether the footer is behind or below the visible screen.
3. Scroll down slightly, then back up, and compare the HUD values with the static `100vh` layout.

## Comparison

Compare this page with [`test-2.md`](test-2.md), which uses `100dvh`, and [`test-3.md`](test-3.md), which uses `100svh`.
