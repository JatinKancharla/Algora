export default function Aboutus() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-black px-5 sm:px-8 py-16 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 dark:text-white/40">About</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-black dark:text-white">
            Algorithm Visualizer
          </h1>
          <p className="text-black/60 dark:text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            A pure visualization tool designed to help you understand data structures and algorithms by seeing exactly how they operate under the hood, step by step.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-black dark:text-white">Dynamic Step Engine</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
              Watch variable comparisons, array mutations, and structural pointer changes. You can pause the execution, step backward, or speed it up at your own pace.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-black dark:text-white">True Visualizations</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
              We don't just use bars for everything. Trees calculate custom hierarchical layouts, Linked Lists draw precise SVG arrows, and Stacks and Queues map to physical geometric containers.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-black dark:text-white">Built-in References</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
              Every algorithm comes with Time and Space complexity analysis and raw code implementation across multiple programming languages.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-8 pb-6 border-t border-black/10 dark:border-white/10 text-center">
          <p className="text-xs text-black/40 dark:text-white/40 font-mono">
            Designed for educational purposes. <br/>
            © 2026 Algora. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
