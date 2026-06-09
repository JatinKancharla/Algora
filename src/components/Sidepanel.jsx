import { algorithmCategories } from '../algorithms';
import { useState, useEffect } from 'react';

export default function Sidebar({ selectedAlgorithm, onSelectAlgorithm, isOpen, onClose, width }) {
  const [openCategories, setOpenCategories] = useState(['sorting']);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    try { setVisited(JSON.parse(localStorage.getItem('algora-visited') || '[]')); }
    catch { setVisited([]); }
  }, [selectedAlgorithm]);

  // Auto-open the category containing the active algorithm
  useEffect(() => {
    const activeCategory = algorithmCategories.find(cat =>
      cat.items.some(item => item.slug === selectedAlgorithm)
    );
    if (activeCategory && !openCategories.includes(activeCategory.slug)) {
      setOpenCategories(prev => [...prev, activeCategory.slug]);
    }
  }, [selectedAlgorithm]);

  const toggle = (slug) =>
    setOpenCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64
        bg-white dark:bg-black
        border-r border-black/8 dark:border-white/8
        transform transition-transform duration-200 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col overflow-hidden transition-colors duration-200
      `}
      style={width ? { width: `${width}px`, minWidth: `${width}px` } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/8 dark:border-white/8">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
            Algorithms
          </span>
          <button onClick={onClose} className="lg:hidden text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Accordion categories */}
        <div className="flex-1 overflow-y-auto">
          {algorithmCategories.map((category) => {
            const isOpen = openCategories.includes(category.slug);
            const hasItems = category.items.length > 0;

            return (
              <div key={category.slug} className="border-b border-black/5 dark:border-white/5 last:border-0">
                {/* Category header — clickable */}
                <button
                  onClick={() => toggle(category.slug)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm font-semibold text-black/80 dark:text-white/80 tracking-tight">
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {!hasItems && (
                      <span className="text-[9px] font-mono uppercase tracking-widest text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-1.5 py-0.5">
                        Soon
                      </span>
                    )}
                    <svg
                      className={`w-3.5 h-3.5 text-black/35 dark:text-white/35 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Algorithm list */}
                {isOpen && (
                  <div className="bg-black/[0.02] dark:bg-white/[0.02]">
                    {hasItems ? (
                      category.items.map((algo) => {
                        const isActive = selectedAlgorithm === algo.slug;
                        const isVisited = visited.includes(algo.slug);
                        return (
                          <button
                            key={algo.slug}
                            onClick={() => { onSelectAlgorithm(algo.slug); onClose(); }}
                            className={`
                              w-full text-left px-5 py-2 text-sm transition-all min-h-[36px]
                              flex items-center justify-between
                              ${isActive
                                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                                : 'text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                              }
                            `}
                          >
                            <span>{algo.name}</span>
                            {isVisited && !isActive && (
                              <svg className="w-3 h-3 text-black/30 dark:text-white/30 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-5 py-2.5 text-xs text-black/30 dark:text-white/30 font-mono italic">Coming soon</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
