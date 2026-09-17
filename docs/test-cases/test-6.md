# Test 6

Status: Defined

Runnable page: `/test-6`

## Purpose

Test a fixed header with a page sized to `200svh`.

## Expected behavior

The header remains fixed while the two-small-viewport-height page scrolls beneath it. The page height is based on the browser’s minimum visible viewport.

## Procedure

1. Load the page with the browser toolbar visible.
2. Scroll down and confirm that the header stays fixed.
3. Compare the page height and toolbar behavior with Tests 7 and 8.
