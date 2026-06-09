import { useState } from 'react';

const icons = {
  compare: <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>,
  swap:    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>,
  done:    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  idle:    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></svg>,
};
const labels = { compare: 'Compare', swap: 'Swap', done: 'Done', idle: 'Ready' };

export default function StepDescription({ stepData, steps = [], currentStep = 0 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const { action, description } = stepData;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isMaximized) {
    const historyText = steps.slice(0, currentStep + 1).map((s, i) => `Step ${i + 1}: ${s.description}`).join('\n');
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
        <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col w-full h-full max-w-4xl max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
            <h3 className="text-sm font-bold text-black dark:text-white tracking-tight">Operation History</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => handleCopy(historyText)} className="text-xs font-mono tracking-widest uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white flex items-center gap-1">
                {copied ? 'Copied!' : 'Copy All'}
                {!copied && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
              </button>
              <button onClick={() => setIsMaximized(false)} className="text-black/50 dark:text-white/50 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {steps.slice(0, currentStep + 1).map((s, idx) => (
              <div key={idx} className={`flex items-start gap-4 p-3 border border-black/5 dark:border-white/5 ${idx === currentStep ? 'bg-black/[0.03] dark:bg-white/[0.05]' : ''}`}>
                <div className="flex items-center gap-2 text-black/45 dark:text-white/45 w-24 shrink-0 pt-0.5">
                  {icons[s.action] ?? icons.idle}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/35 dark:text-white/35">{labels[s.action] ?? 'Step'}</span>
                </div>
                <div className="w-px h-full min-h-[20px] bg-black/10 dark:bg-white/10 shrink-0" />
                <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black px-4 py-3 flex items-center gap-3 transition-colors duration-200">
      <div className="flex items-center gap-2 text-black/45 dark:text-white/45 shrink-0">
        {icons[action] ?? icons.idle}
        <span className="text-[10px] font-mono uppercase tracking-widest text-black/35 dark:text-white/35">
          {labels[action] ?? 'Step'}
        </span>
      </div>
      <div className="w-px h-5 bg-black/10 dark:bg-white/10 shrink-0" />
      <p className="flex-1 text-sm text-black/70 dark:text-white/70 leading-relaxed truncate">{description}</p>
      
      <div className="flex items-center gap-2 pl-2 border-l border-black/10 dark:border-white/10">
        <button onClick={() => handleCopy(description)} className="p-1.5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" title="Copy Step">
          {copied ? (
             <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : (
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
          )}
        </button>
        <button onClick={() => setIsMaximized(true)} className="p-1.5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" title="View History">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
