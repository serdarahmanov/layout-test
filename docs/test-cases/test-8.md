# Test 8

Status: Defined

Runnable page: `/test-8`

## Purpose

Test a fixed header with a page sized to `200vh`.

## Expected behavior

The header remains fixed while the two-large-viewport-height page scrolls beneath it. This provides a classic `vh` comparison against the `svh` and `dvh` versions.

## Procedure

1. Load the page with the browser toolbar visible.
2. Scroll down and confirm that the header stays fixed.
3. Compare the classic page height with Tests 6 and 7.
