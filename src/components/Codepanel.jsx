import { useState } from 'react';

const LANGUAGES = ['javascript', 'python', 'cpp', 'java'];
const LANG_LABELS = { javascript: 'JS', python: 'Python', cpp: 'C++', java: 'Java' };

export default function CodePanel({ meta }) {
  const [activeLang, setActiveLang] = useState('javascript');
  const [showPseudo, setShowPseudo] = useState(false);
  const [copied, setCopied] = useState(false);
  if (!meta?.code) return null;

  const code = meta.code[activeLang] || '';
  const pseudo = meta.pseudocode || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(showPseudo ? pseudo : code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black flex flex-col transition-colors duration-200">
      {/* Tab bar */}
      <div className="flex items-center border-b border-black/8 dark:border-white/8">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => { setActiveLang(lang); setShowPseudo(false); }}
            className={`px-3 py-2.5 text-xs font-mono tracking-wide transition-all min-h-[40px] border-r border-black/5 dark:border-white/5
              ${activeLang === lang && !showPseudo
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'}`}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
        <div className="ml-auto flex items-center">
          <button
            onClick={() => handleCopy()}
            className="px-3 py-2.5 text-xs font-mono tracking-wide transition-all min-h-[40px] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] flex items-center gap-1 border-l border-black/5 dark:border-white/5"
            title="Copy Code"
          >
            {copied ? 'Copied!' : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
          </button>
          <button
            onClick={() => setShowPseudo(!showPseudo)}
            className={`px-3 py-2.5 text-xs font-mono tracking-wide transition-all min-h-[40px]
              ${showPseudo
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'}`}
          >
            Pseudo
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-auto max-h-64 lg:max-h-80">
        <pre className="p-4 text-[11px] leading-relaxed">
          <code className="font-mono">
            {(showPseudo ? pseudo : code).split('\n').map((line, i) => (
              <div key={i} className="flex hover:bg-black/[0.03] dark:hover:bg-white/[0.03] -mx-4 px-4 transition-colors">
                <span className="text-black/20 dark:text-white/20 select-none w-5 text-right mr-4 shrink-0 tabular-nums">{i + 1}</span>
                <span className="text-black/70 dark:text-white/70">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
