import { useMemo, useState, useEffect, useRef } from 'react';

export default function VisualizationCanvas({ stepData, meta }) {
  const { array, comparing = [], sorted = [], action, treeData = null, graphData = null } = stepData;
  const category = meta?.category || 'sorting';

  const maxVal = useMemo(() => Math.max(...array, 1), [array]);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        setDimensions({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  let mode = 'bars';
  if (category === 'graphs') mode = 'graph';
  if (category === 'trees') mode = 'tree';
  if (category === 'data-structures') {
    if (meta.slug === 'stack') mode = 'stack';
    else if (meta.slug.includes('queue')) mode = 'queue';
    else if (meta.slug.includes('linked-list')) mode = 'linkedlist';
    else mode = 'array';
  }

  const colorComparing = 'bg-cyan-400 ring-1 ring-cyan-500 text-black border-cyan-500';
  const colorSwapping = 'bg-fuchsia-500 ring-1 ring-fuchsia-600 text-white border-fuchsia-600';
  const colorSorted = 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white';
  const colorDefault = 'bg-black/5 dark:bg-white/5 text-black dark:text-white border-black/20 dark:border-white/20';
  
  const svgComparing = { fill: '#22d3ee', stroke: '#06b6d4', text: '#000' };
  const svgSwapping = { fill: '#d946ef', stroke: '#c026d3', text: '#fff' };
  const svgSorted = { fill: '#000', stroke: '#000', text: '#fff', darkFill: '#fff', darkStroke: '#fff', darkText: '#000' };
  const svgDefault = { fill: 'transparent', stroke: 'rgba(0,0,0,0.2)', text: '#000', darkStroke: 'rgba(255,255,255,0.2)', darkText: '#fff' };

  const getBoxStyle = (index) => {
    const isComparing = comparing.includes(index);
    const isSorted = sorted.includes(index);
    if (isSorted || action === 'done') return colorSorted;
    if (isComparing && action === 'swap') return colorSwapping;
    if (isComparing) return colorComparing;
    return colorDefault;
  };

  const wrapperClasses = isMaximized 
    ? "fixed inset-4 z-50 bg-white dark:bg-black border border-black/20 dark:border-white/20 shadow-2xl rounded-xl overflow-hidden flex flex-col transition-all duration-300"
    : "w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 transition-all duration-300 relative min-h-[350px] flex flex-col";

  const renderContent = () => {
    if (mode === 'bars') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="flex items-end justify-center gap-[3px] sm:gap-1 w-full h-full min-h-[200px]">
            {array.map((value, index) => {
              const heightPercent = (value / maxVal) * 100;
              const isComparing = comparing.includes(index);
              const isSorted = sorted.includes(index);
              const isDone = action === 'done';

              let barColor = 'bg-black/15 dark:bg-white/20';
              if (isDone || isSorted) barColor = 'bg-black dark:bg-white';
              else if (isComparing && action === 'swap') barColor = 'bg-fuchsia-500 ring-1 ring-fuchsia-600 text-white';
              else if (isComparing) barColor = 'bg-cyan-400 ring-1 ring-cyan-500 text-black';

              return (
                <div key={index} className="flex flex-col items-center flex-1" style={{ minWidth: '6px' }}>
                  {array.length <= 25 && (
                    <span className="text-[9px] sm:text-[10px] font-mono text-black/40 dark:text-white/40 mb-0.5 leading-none">
                      {value}
                    </span>
                  )}
                  <div
                    className={`w-full ${barColor} transition-all duration-200 ease-out`}
                    style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (mode === 'stack') {
      return (
        <div className="flex-1 flex flex-col items-center justify-end p-6 pb-12">
          <p className="text-[10px] font-mono text-black/40 dark:text-white/40 mb-4 uppercase tracking-widest absolute top-6">Stack Container (LIFO)</p>
          <div className="border-x-4 border-b-4 border-black/30 dark:border-white/30 rounded-b-lg w-48 min-h-[240px] flex flex-col-reverse items-center justify-start p-2 gap-2 relative">
            {array.map((value, index) => (
              <div key={index} className={`w-full py-3 flex items-center justify-center border-2 ${getBoxStyle(index)} text-sm font-bold font-mono transition-all duration-300 transform scale-100`}>
                {value}
              </div>
            ))}
            {array.length === 0 && <span className="absolute top-1/2 text-sm font-mono text-black/30 dark:text-white/30">Empty Stack</span>}
          </div>
        </div>
      );
    }

    if (mode === 'queue') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-[10px] font-mono text-black/40 dark:text-white/40 mb-6 uppercase tracking-widest absolute top-6">Queue Tube (FIFO)</p>
          <div className="border-y-4 border-black/30 dark:border-white/30 w-full max-w-2xl h-24 flex items-center justify-start px-2 gap-2 overflow-x-auto relative scrollbar-hide">
            {array.map((value, i) => {
              const index = array.length - 1 - i;
              const val = array[index];
              return (
                <div key={index} className={`shrink-0 w-16 h-16 flex items-center justify-center border-2 ${getBoxStyle(index)} text-sm font-bold font-mono transition-all duration-300`}>
                  {val}
                </div>
              );
            })}
            {array.length === 0 && <span className="absolute left-1/2 -translate-x-1/2 text-sm font-mono text-black/30 dark:text-white/30">Empty Queue</span>}
          </div>
          <div className="w-full max-w-2xl flex justify-between mt-2 px-2">
            <span className="text-[10px] font-mono text-black/40 dark:text-white/40">Rear (Enqueue ↓)</span>
            <span className="text-[10px] font-mono text-black/40 dark:text-white/40">Front (Dequeue ↓)</span>
          </div>
        </div>
      );
    }

    if (mode === 'linkedlist') {
      const isDouble = meta.slug.includes('doubly');
      const isCircular = meta.slug.includes('circular');
      
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <p className="text-[10px] font-mono text-black/40 dark:text-white/40 uppercase tracking-widest absolute top-6">{meta.name}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 relative z-10 w-full mt-8">
            {array.map((value, index) => (
              <div key={index} className="flex items-center relative group">
                <div className={`w-14 h-14 flex flex-col items-center justify-center border-2 ${getBoxStyle(index)} transition-all duration-300 relative z-10 bg-white dark:bg-black`}>
                  <span className="text-sm font-bold font-mono">{value}</span>
                  <span className="text-[8px] font-mono opacity-50 absolute -bottom-4">{index}</span>
                </div>
                {index < array.length - 1 && (
                  <div className="absolute left-14 w-12 flex items-center justify-center z-0">
                    <div className="w-full h-0.5 bg-black/30 dark:bg-white/30 relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-b-2 border-black/30 dark:border-white/30 -rotate-45" />
                      {isDouble && (
                        <div className="absolute left-0 -top-1 w-2 h-2 border-l-2 border-t-2 border-black/30 dark:border-white/30 -rotate-45" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {array.length === 0 && <span className="text-sm font-mono text-black/30 dark:text-white/30">Empty List</span>}
          </div>
          {isCircular && array.length > 1 && dimensions.width > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
               <path 
                  d={`M ${dimensions.width/2 + (array.length * 40)} 180 Q ${dimensions.width/2} 260 ${dimensions.width/2 - (array.length * 40)} 180`} 
                  fill="none" 
                  className="stroke-black/20 dark:stroke-white/20" 
                  strokeWidth="2"
                  strokeDasharray="4 4"
               />
               <polygon points="0,-4 8,0 0,4" transform={`translate(${dimensions.width/2 - (array.length * 40)}, 180) rotate(-150)`} className="fill-black/20 dark:fill-white/20" />
            </svg>
          )}
        </div>
      );
    }

    if (mode === 'array') {
      return (
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 p-6">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center border-2 ${getBoxStyle(index)} text-sm font-mono transition-all duration-200`}>
                {value}
              </div>
              <span className="text-[9px] font-mono text-black/40 dark:text-white/40 mt-1">{index}</span>
            </div>
          ))}
          {array.length === 0 && <span className="text-sm font-mono text-black/30 dark:text-white/30">Empty</span>}
        </div>
      );
    }

    if (mode === 'tree' || mode === 'graph') {
      let tNodes = [];
      let tEdges = [];
      
      if (treeData && mode === 'tree') {
         let leafCount = 0;
         const assignCoords = (node, depth) => {
           if (!node) return;
           if (!node.left && !node.right) {
              node.x = leafCount++;
           } else {
              if (node.left) assignCoords(node.left, depth + 1);
              if (node.right) assignCoords(node.right, depth + 1);
              
              if (node.left && node.right) {
                 node.x = (node.left.x + node.right.x) / 2;
              } else if (node.left) {
                 node.x = node.left.x + 0.5;
              } else {
                 node.x = node.right.x - 0.5;
              }
           }
           node.y = depth;
           tNodes.push(node);
           if (node.left) tEdges.push({ from: node, to: node.left });
           if (node.right) tEdges.push({ from: node, to: node.right });
         };
         
         assignCoords(treeData, 0);
         
         const minX = Math.min(...tNodes.map(n => n.x), 0);
         const maxX = Math.max(...tNodes.map(n => n.x), 1);
         const rangeX = Math.max(maxX - minX, 1);
         const maxY = Math.max(...tNodes.map(n => n.y), 1);
         
         tNodes.forEach(n => {
           n.cx = 40 + ((n.x - minX) / rangeX) * (dimensions.width - 80);
           n.cy = 40 + (n.y / Math.max(maxY, 1)) * (dimensions.height - 80);
         });
         
      } else if (graphData && mode === 'graph') {
         tNodes = graphData.nodes;
         tEdges = graphData.edges.map(e => ({
           from: tNodes.find(n => n.id === e.fromId),
           to: tNodes.find(n => n.id === e.toId)
         })).filter(e => e.from && e.to);
      } else {
         const n = array.length;
         const levelHeight = 60;
         for (let i = 0; i < n; i++) {
           const level = Math.floor(Math.log2(i + 1));
           const posInLevel = i - (Math.pow(2, level) - 1);
           const nodesInLevel = Math.pow(2, level);
           const cx = (dimensions.width / (nodesInLevel + 1)) * (posInLevel + 1);
           const cy = 40 + level * levelHeight;
           tNodes.push({ id: i, val: array[i], cx, cy });
         }
         for (let i = 0; i < n; i++) {
           if (2 * i + 1 < n) tEdges.push({ from: tNodes[i], to: tNodes[2 * i + 1] });
           if (2 * i + 2 < n) tEdges.push({ from: tNodes[i], to: tNodes[2 * i + 2] });
         }
      }

      return (
        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-6">
          {tNodes.length === 0 ? (
            <span className="text-sm font-mono text-black/30 dark:text-white/30">Empty</span>
          ) : (
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
              {tEdges.map((edge, i) => (
                <line
                  key={`edge-${i}`}
                  x1={edge.from.cx} y1={edge.from.cy}
                  x2={edge.to.cx} y2={edge.to.cy}
                  className="stroke-black/15 dark:stroke-white/15"
                  strokeWidth="2"
                />
              ))}
              
              {tNodes.map((node) => {
                const isComparing = comparing.includes(node.id);
                const isSorted = sorted.includes(node.id);
                const isDone = action === 'done';

                let fill = svgDefault.fill;
                let stroke = svgDefault.stroke;
                let text = svgDefault.text;
                
                if (isDone || isSorted) { fill = svgSorted.fill; stroke = svgSorted.stroke; text = svgSorted.text; }
                else if (isComparing && action === 'swap') { fill = svgSwapping.fill; stroke = svgSwapping.stroke; text = svgSwapping.text; }
                else if (isComparing) { fill = svgComparing.fill; stroke = svgComparing.stroke; text = svgComparing.text; }

                let gClass = 'transition-all duration-300';
                if (!isComparing && !isSorted && !isDone) {
                  gClass += ' fill-white dark:fill-black stroke-black/20 dark:stroke-white/20 text-black dark:text-white';
                } else {
                  gClass += ' stroke-transparent';
                }

                return (
                  <g key={node.id} className={gClass} transform={`translate(${node.cx}, ${node.cy})`}>
                    <circle r="18" strokeWidth="2" style={isComparing || isSorted || isDone ? { fill, stroke } : undefined} />
                    <text textAnchor="middle" dy=".3em" fontSize="12" fontFamily="monospace" style={isComparing || isSorted || isDone ? { fill: text } : { fill: 'currentColor' }}>
                      {node.val}
                    </text>
                    <text textAnchor="middle" dy="2.5em" fontSize="8" fontFamily="monospace" className="fill-black/30 dark:fill-white/30">
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div ref={containerRef} className={wrapperClasses}>
        {isMaximized && (
          <div className="absolute top-3 left-3 z-20">
            <button 
              onClick={() => setIsMaximized(false)}
              className="p-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors rounded"
              title="Close Fullscreen"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="absolute top-3 right-3 z-20">
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors rounded"
            title={isMaximized ? "Restore Size" : "Maximize Canvas"}
          >
            {isMaximized ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            )}
          </button>
        </div>
        {renderContent()}
      </div>
      {/* Background overlay when maximized */}
      {isMaximized && (
        <div 
          className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm z-40" 
          onClick={() => setIsMaximized(false)}
        />
      )}
    </>
  );
}
