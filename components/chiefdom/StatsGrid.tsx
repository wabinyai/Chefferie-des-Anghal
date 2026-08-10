interface StatItem {
  label: string;
  value: string;
  unit: string;
  year: string;
  source: string;
  note?: string;
}

interface StatsGridProps {
  items: StatItem[];
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.label} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-700">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-neutral-950">{item.value}</p>
              <p className="mt-2 text-sm text-neutral-600">{item.unit}</p>
              <div className="mt-4 text-xs uppercase tracking-[0.24em] text-neutral-500">{item.year}</div>
              <p className="mt-2 text-sm text-neutral-600">Source: {item.source}</p>
              {item.note ? <p className="mt-2 text-sm text-neutral-500">{item.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
