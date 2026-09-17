# Test 9

Status: Defined

Runnable page: `/test-9`

## Purpose

Demonstrate a JS-snapshot fallback for inconsistent `svh` behavior across iOS Safari and iOS Chrome.

## Expected behavior

The page identifies the browser and records exactly one visible viewport height on initial load. It reads `window.visualViewport.height`, falling back to `window.innerHeight` when `visualViewport` is unsupported. Compare that JS snapshot with the native `100svh` probe. The JS value is exposed as `--js-svh` for sizing a critical shell consistently from the initial state.

## Procedure

1. Open `/test-9` in iOS Safari, then repeat in iOS Chrome.
2. Note the native `100svh` value and the initial JS snapshot.
3. Scroll slowly to hide and reveal the browser toolbar.
4. Confirm that the JS snapshot remains fixed because it was captured only during initial page load.
5. Compare the initial snapshot with the native `svh` value in each browser.

## Implementation note

This is a measurement-and-snapshot pattern, not a claim that every browser bug has the same cause. For production, apply the captured initial value only to UI that must remain visible.

## Comparison

Compare this page with [`test-3.md`](test-3.md), which relies entirely on native `100svh`, and [`test-4.md`](test-4.md), which compares `100dvh` and `100svh` directly.
