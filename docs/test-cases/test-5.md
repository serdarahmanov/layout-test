# Test 5

Status: Defined

Runnable page: `/test-5`

## Purpose

Exercise the classic `100vh` behavior over a longer scroll distance.

## Expected behavior

This page uses the same `100vh` shell as Test 1, but includes multiple full-height scroll sections. The extra content gives the mobile browser toolbar more room to hide and reappear while the viewport-sized shell remains fixed to the classic viewport unit.

## Procedure

1. Load the page with the browser toolbar expanded.
2. Scroll slowly through all sections and observe the footer and fixed HUD.
3. Scroll back to the top and compare the shell position after the toolbar changes state.

## Comparison

Compare this page with [`test-2.md`](test-2.md), which uses `100dvh`, and [`test-3.md`](test-3.md), which uses `100svh`.
