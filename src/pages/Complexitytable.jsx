import { useState } from 'react';
import { Link } from 'react-router-dom';
import { algorithmCategories } from '../algorithms';

const getClass = (value) => {
  if (!value) return 'text-black/30 dark:text-white/30';
  if (value.includes('1)') || value.includes('log n)')) return 'text-black dark:text-white font-semibold';
  if (value === 'O(n)') return 'text-black/75 dark:text-white/75';
  if (value.includes('n log n')) return 'text-black/55 dark:text-white/55';
  if (value.includes('V + E')) return 'text-black/65 dark:text-white/65';
  if (value.includes('h)')) return 'text-black/60 dark:text-white/60';
  return 'text-black/40 dark:text-white/40';
};

export default function ComplexityTable() {
  const [activeCategory, setActiveCategory] = useState(algorithmCategories[0].slug);

  const activeAlgos = algorithmCategories.find(c => c.slug === activeCategory)?.items || [];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-black px-5 sm:px-8 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-black dark:text-white">
            Complexity Table
          </h1>
          <p className="text-black/50 dark:text-white/50 text-sm max-w-md">
            Time and space complexity.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[11px] font-mono">
          {[
            { cls: 'text-black dark:text-white', label: 'O(1) / O(log n)' },
            { cls: 'text-black/75 dark:text-white/75', label: 'O(n) / O(V+E)' },
            { cls: 'text-black/55 dark:text-white/55', label: 'O(n log n)' },
            { cls: 'text-black/40 dark:text-white/40', label: 'O(n²) or worse' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 bg-current ${item.cls}`} />
              <span className={item.cls}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {algorithmCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-transparent text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border border-black/10 dark:border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                {['Algorithm', 'Best', 'Average', 'Worst', 'Space', ''].map((h) => (
                  <th key={h} className={`py-3 text-[10px] font-mono uppercase tracking-[0.15em] text-black/40 dark:text-white/40 ${h === 'Algorithm' ? 'text-left px-5' : 'text-center px-3'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeAlgos.map((algo) => (
                <tr key={algo.slug} className="border-b border-black/5 dark:border-white/5 last:border-b-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-semibold text-black dark:text-white text-sm tracking-tight">{algo.name}</span>
                  </td>
                  {[algo.complexity.best, algo.complexity.average, algo.complexity.worst, algo.complexity.space].map((val, j) => (
                    <td key={j} className="text-center px-3 py-3">
                      <span className={`font-mono text-xs ${getClass(val)}`}>{val}</span>
                    </td>
                  ))}
                  <td className="text-center px-3 py-3">
                    <Link
                      to={`/visualizer?algo=${algo.slug}`}
                      className="text-[11px] font-mono text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors tracking-wide"
                    >
                      Run →
                    </Link>
                  </td>
                </tr>
              ))}
              {activeAlgos.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-black/40 dark:text-white/40 text-sm">
                    No algorithms found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link to="/" className="inline-block text-xs font-mono text-black/35 dark:text-white/35 hover:text-black/70 dark:hover:text-white/70 transition-colors tracking-wide">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
