# Test 7

Status: Defined

Runnable page: `/test-7`

## Purpose

Test a fixed header with a page sized to `200dvh`.

## Expected behavior

The header remains fixed while the two-dynamic-viewport-height page scrolls beneath it. The page height follows the currently visible viewport.

## Procedure

1. Load the page with the browser toolbar visible.
2. Scroll down and confirm that the header stays fixed.
3. Compare the dynamic page height with Tests 6 and 8.
