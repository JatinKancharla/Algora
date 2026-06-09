import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Sorting',
    description: 'Bubble, Selection, Insertion, Merge, Quick and Heap Sort',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ),
    link: '/visualizer',
    ready: true,
  },
  {
    name: 'Searching',
    description: 'Linear Search and Binary Search visualized step by step',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    link: '/visualizer',
    ready: true,
  },
  {
    name: 'Graphs',
    description: 'BFS, DFS and Dijkstra shortest path algorithms',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: '/visualizer',
    ready: true,
  },
  {
    name: 'Trees',
    description: 'BST Insertion, In-Order and Pre-Order traversals',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    link: '/visualizer',
    ready: true,
  },
  {
    name: 'Data Structures',
    description: 'Dynamic Arrays, Stacks, Queues, Priority Queues, and Linked Lists',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    link: '/visualizer',
    ready: true,
  },
  {
    name: 'Complexity',
    description: 'Compare time and space complexity of all algorithms',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    link: '/complexity',
    ready: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col bg-white dark:bg-black transition-colors duration-200">

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-2xl w-full text-center space-y-8">

          <p className="text-xs font-mono uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
            Algorithm Visualizer
          </p>

          <h1 className="text-[clamp(4rem,12vw,8rem)] font-black leading-none tracking-tighter text-black dark:text-white transition-colors">
            Algora
          </h1>

          <p className="text-black/50 dark:text-white/50 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Watch every comparison, swap and decision happen in real time.
          </p>

          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-16 bg-black/10 dark:bg-white/10" />
            <div className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
            <div className="h-px w-16 bg-black/10 dark:bg-white/10" />
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/visualizer" id="cta-start"
              className="px-7 py-3 bg-black text-white dark:bg-white dark:text-black text-sm font-semibold tracking-wide hover:bg-black/80 dark:hover:bg-white/85 transition-colors">
              Start Visualizing
            </Link>
            <Link to="/complexity" id="cta-complexity"
              className="px-7 py-3 border border-black/15 dark:border-white/15 text-black dark:text-white text-sm font-semibold tracking-wide hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors">
              Complexity Table
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-5 sm:px-8 py-16">
        <div className="max-w-5xl mx-auto">


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-black/5 dark:bg-white/5">
            {categories.map((cat) => (
              <Link key={cat.name} to={cat.link}
                className="group bg-white dark:bg-black p-6 flex flex-col gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <svg className="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-black/50 dark:group-hover:text-white/50 transition-colors -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black/80 dark:text-white/80 mb-1.5 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 border-t border-black/10 dark:border-white/10 text-center">
        <p className="text-[11px] font-mono text-black/40 dark:text-white/40">
          © 2026 Algora. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
