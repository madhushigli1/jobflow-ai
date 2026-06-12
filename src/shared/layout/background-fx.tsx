/**
 * Fixed editorial backdrop: faint ledger grid on warm paper.
 * Purely presentational, sits behind all content.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid mask-fade-b" />
    </div>
  );
}
