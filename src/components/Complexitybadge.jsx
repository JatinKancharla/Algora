const getClass = (val) => {
  if (!val) return 'text-black/30 dark:text-white/30';
  if (val.includes('1)') || val.includes('log n)')) return 'text-black dark:text-white font-semibold';
  if (val === 'O(n)') return 'text-black/75 dark:text-white/75';
  if (val.includes('n log n')) return 'text-black/60 dark:text-white/60';
  return 'text-black/45 dark:text-white/45';
};

export default function ComplexityBadge({ meta }) {
  if (!meta?.complexity) return null;
  const { best, average, worst, space } = meta.complexity;
  const rows = [
    { label: 'Best case',  value: best },
    { label: 'Average',    value: average },
    { label: 'Worst case', value: worst },
    { label: 'Space',      value: space },
  ];
  return (
    <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black transition-colors duration-200">
      <div className="px-4 py-2.5 border-b border-black/8 dark:border-white/8">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
          Complexity
        </span>
      </div>
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-black/55 dark:text-white/55 font-mono">{label}</span>
            <span className={`text-xs font-mono ${getClass(value)}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
