# Test 9

Status: Defined

Runnable page: `/test-9`

## Purpose

Demonstrate a JS-snapshot fallback for inconsistent `svh` behavior across iOS Safari and iOS Chrome.

## Expected behavior

The page waits for `load`, then one animation frame, and reads the browser-computed pixel height of a hidden `100svh` probe. That value is written once to `--snapshot-svh`; both visible viewboxes use the static pixel value.

## Procedure

1. Open `/test-9` in iOS Safari, then repeat in iOS Chrome.
2. Note the initial CSS-computed `100svh` snapshot.
3. Scroll slowly to hide and reveal the browser toolbar.
4. Confirm that both viewboxes remain fixed because they use the static snapshot rather than live `svh`.
5. Compare the initial snapshot between browsers.

## Implementation note

This is a measurement-and-snapshot pattern, not a claim that every browser bug has the same cause. For production, apply the captured initial CSS value only to UI that must remain visible.

## Comparison

Compare this page with [`test-3.md`](test-3.md), which relies entirely on native `100svh`, and [`test-4.md`](test-4.md), which compares `100dvh` and `100svh` directly.
