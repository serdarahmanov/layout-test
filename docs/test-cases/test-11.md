# Test 11

Status: Defined

Runnable page: `/test-11`

## Purpose

Apply the viewport-snapshot-gsap strategy to the same Lenis + GSAP pinned viewport animation.

## Expected behavior

After `load` and one animation frame, the page snapshots a hidden CSS `100svh` probe into `--snapshot-svh`. Pin creation is gated until that value is applied. The stage height, pin distance, and orb travel use the static snapshot. Desktop uses Lenis; touch devices use native scrolling while GSAP remains active. Mobile toolbar movement is ignored by ScrollTrigger and does not recreate or refresh the pin.

## Procedure

1. Open the page and wait for the frozen height readout.
2. Scroll slowly through the pinned stage. On desktop, Lenis drives ScrollTrigger; on touch devices, native scrolling drives it.
3. Hide and reveal the mobile browser toolbar.
4. Confirm that the stage, pin distance, and orb travel stay coherent and compare the live HUD values separately.
5. Compare with [`test-10.md`](test-10.md), which intentionally uses live viewport values and refreshes on every resize.

## Implementation note

The initial path does not call an unnecessary `ScrollTrigger.refresh()` after pin creation: creation occurs only after the snapshot is applied. A refresh is reserved for later snapshot changes caused by orientation or genuine layout changes.
