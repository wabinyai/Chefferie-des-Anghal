interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.32em] text-brand-700">{subtitle}</p>
      <h2 className="text-3xl font-serif font-semibold tracking-tight text-neutral-950 sm:text-4xl">{title}</h2>
    </div>
  );
}
