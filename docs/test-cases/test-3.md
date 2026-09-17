# Test 3

Status: Defined

Runnable page: `/test-3`

## Purpose

Use `100svh` with the same header, main content, and footer layout as Tests 1 and 2.

## Expected behavior

The layout should use the safe minimum viewport height and avoid being hidden behind browser chrome.

The page uses the same scroll sections and live indicator as Test 2, but the indicator is sized with `100svh`. Its measured pixel height should stay flat across toolbar states, providing a control for the dynamic `100dvh` behavior.

## Procedure

1. Note the indicator height with the toolbar expanded.
2. Scroll through the filler sections until the toolbar hides.
3. Confirm that the indicator height remains unchanged and the footer is not hidden behind browser chrome.

## Comparison

Compare this page with [`test-1.md`](test-1.md) and [`test-2.md`](test-2.md).
