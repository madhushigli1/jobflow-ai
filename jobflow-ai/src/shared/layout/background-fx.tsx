/**
 * Fixed decorative background: grid, aurora blobs, and a top vignette.
 * Purely presentational, sits behind all content (z-index -10).
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base grid, fading toward bottom */}
      <div className="absolute inset-0 bg-grid opacity-[0.4] mask-fade-b" />

      {/* aurora blobs */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-0 -left-40 h-[30rem] w-[30rem] rounded-full bg-indigo/15 blur-[120px] animate-aurora [animation-delay:-12s]" />

      {/* subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
