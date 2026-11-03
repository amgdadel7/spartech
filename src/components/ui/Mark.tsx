type MarkProps = { light?: boolean; compact?: boolean };
/** Official bilingual Spartech lockup supplied in the brand assets. */
export function Mark({ light = false, compact = false }: MarkProps) {
  return <div className={`brand-mark ${light ? 'brand-mark--light' : ''} ${compact ? 'brand-mark--compact' : ''}`}>
    <img src="/assets/spartech-logo.png" alt="Spartech / سبارتك" />
  </div>;
}
