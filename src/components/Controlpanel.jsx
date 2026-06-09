import { useState, useEffect } from 'react';

export default function ControlPanel({
  onVisualize,
  onPause,
  onReset,
  isSearch,
  meta,
}) {
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Interactive Data Structure State
  const isDataStructure = meta?.category === 'data-structures';
  const [dsSize, setDsSize] = useState(5);
  const [dsOps, setDsOps] = useState([]);
  const [dsOpType, setDsOpType] = useState('push');
  const [dsOpValue, setDsOpValue] = useState('');

  useEffect(() => {
    if (meta?.slug?.includes('queue')) setDsOpType('enqueue');
    else if (meta?.slug?.includes('list') || meta?.slug?.includes('array')) setDsOpType('insert');
    else setDsOpType('push');
    setDsOps([]);
  }, [meta?.slug]);

  const handleVisualize = () => {
    if (!inputValue.trim()) {
      setAlertMessage("Field cannot be empty. Please enter values to begin visualization.");
      setShowAlert(true);
      return;
    }
    const parts = inputValue.split(';')[0].split(',');
    if (parts.length > 15) {
      setAlertMessage("Value limit exceeded! You can only enter up to 15 values.");
      setShowAlert(true);
      return;
    }
    onVisualize(inputValue);
  };

  const handleAddDsOp = () => {
    const needsValue = ['push', 'enqueue', 'insert'].includes(dsOpType);
    if (needsValue && !dsOpValue.trim()) {
      setAlertMessage("Value is required for this operation.");
      setShowAlert(true);
      return;
    }
    setDsOps([...dsOps, { type: dsOpType, val: parseInt(dsOpValue, 10) || 0 }]);
    setDsOpValue('');
  };

  const handleVisualizeDs = () => {
    if (dsOps.length === 0) {
      setAlertMessage("Please add at least one operation to visualize.");
      setShowAlert(true);
      return;
    }
    const payload = JSON.stringify({ size: dsSize, ops: dsOps });
    onVisualize('json:' + payload);
  };

  let placeholder = 'Enter values: 15, 42, 7, 33...';
  let tip = 'Enter up to 15 values to visualize.';

  if (isSearch) {
    placeholder = 'Enter values;target  e.g. 10,25,7;25';
    tip = 'Use format: values;target';
  } else if (meta?.category === 'trees') {
    placeholder = 'Nodes to insert: 20, 10, 30...';
    tip = 'Values will be inserted into the tree.';
  }

  return (
    <>
      <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black transition-colors duration-200">
        
        {isDataStructure ? (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1 w-20">
                <label className="text-[10px] font-mono uppercase tracking-widest text-black/50 dark:text-white/50">Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={dsSize}
                  onChange={(e) => {
                    let val = parseInt(e.target.value, 10);
                    if (isNaN(val)) val = '';
                    else if (val > 15) val = 15;
                    setDsSize(val);
                  }}
                  onBlur={(e) => {
                    let val = parseInt(e.target.value, 10);
                    if (isNaN(val) || val < 1) val = 5;
                    setDsSize(val);
                  }}
                  className="h-9 px-2 bg-transparent border border-black/20 dark:border-white/20 text-sm font-mono focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 w-28">
                <label className="text-[10px] font-mono uppercase tracking-widest text-black/50 dark:text-white/50">Operation</label>
                <select value={dsOpType} onChange={e => setDsOpType(e.target.value)} className="h-9 px-2 bg-transparent border border-black/20 dark:border-white/20 text-sm font-mono focus:outline-none">
                  {meta?.slug?.includes('queue') ? (
                    <><option value="enqueue">Enqueue</option><option value="dequeue">Dequeue</option></>
                  ) : meta?.slug?.includes('list') || meta?.slug?.includes('array') ? (
                    <><option value="insert">Insert</option><option value="delete">Delete</option></>
                  ) : (
                    <><option value="push">Push</option><option value="pop">Pop</option></>
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
                <label className="text-[10px] font-mono uppercase tracking-widest text-black/50 dark:text-white/50">Value</label>
                <input 
                  type="number" 
                  value={dsOpValue} 
                  onChange={e => setDsOpValue(e.target.value)}
                  placeholder="e.g. 42"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddDsOp();
                  }}
                  className="h-9 px-2 bg-transparent border border-black/20 dark:border-white/20 text-sm font-mono focus:outline-none" 
                />
              </div>
              <button onClick={handleAddDsOp} className="h-10 px-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors">
                Enter
              </button>
            </div>

            <div className="min-h-[40px] border border-black/10 dark:border-white/10 p-2 flex flex-wrap gap-2">
              {dsOps.length === 0 ? (
                <span className="text-xs text-black/30 dark:text-white/30 italic my-auto">No operations queued...</span>
              ) : (
                dsOps.map((op, i) => (
                  <div key={i} className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1 border border-black/10 dark:border-white/10 text-xs font-mono">
                    <span className="font-semibold">{op.type.toUpperCase()}</span>
                    {['push', 'enqueue', 'insert'].includes(op.type) && <span>({op.val})</span>}
                    <button onClick={() => setDsOps(dsOps.filter((_, idx) => idx !== i))} className="ml-1 text-black/40 hover:text-red-500">×</button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center mt-1">
              {dsOps.length > 0 && (
                <button
                  onClick={() => setDsOps([])}
                  className="h-9 px-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  Clear
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button onClick={onReset} className="h-9 px-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors">Reset</button>
                <button onClick={handleVisualizeDs} className="h-9 px-5 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:bg-black/80 dark:hover:bg-white/80 transition-colors">
                  View Final Structure
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ── Standard Input + Buttons ── */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <div className="flex-1 min-w-[200px] flex items-center border border-black/12 dark:border-white/12 focus-within:border-black/40 dark:focus-within:border-white/40 transition-colors">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
                  className="flex-1 h-11 px-3 bg-transparent text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none font-mono"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={handleVisualize}
                  className="h-11 px-5 bg-black text-white dark:bg-white dark:text-black text-sm font-semibold
                    hover:bg-black/80 dark:hover:bg-white/85 transition-all duration-150 whitespace-nowrap flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                  Visualize
                </button>
                
                <button onClick={onPause}
                  className="h-11 w-11 flex justify-center items-center bg-black/5 dark:bg-white/5 text-black dark:text-white
                    hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150 border border-black/10 dark:border-white/10"
                  title="Stop / Pause"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                </button>

                <button onClick={onReset}
                  className="h-11 w-11 flex justify-center items-center bg-black/5 dark:bg-white/5 text-black dark:text-white
                    hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150 border border-black/10 dark:border-white/10"
                  title="Reset"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="px-4 pb-3 text-[11px] text-black/35 dark:text-white/35 font-mono">{tip}</p>
          </>
        )}
      </div>

      {/* Alert Dialog Box */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 shadow-xl w-full max-w-sm">
            <div className="flex items-start gap-4">
              <div className="text-red-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-black dark:text-white mb-1 tracking-tight">Validation Error</h3>
                <p className="text-xs text-black/60 dark:text-white/60 mb-5">{alertMessage}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowAlert(false)}
                    className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
