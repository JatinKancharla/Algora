import { useState, useEffect } from 'react';
import { useVisualizer } from '../hooks/useVisualizer';
import Sidebar from '../components/Sidepanel';
import VisualizationCanvas from '../components/Visualizationcanvas';
import ControlPanel from '../components/Controlpanel';
import StepDescription from '../components/Stepdescription';
import ComplexityBadge from '../components/Complexitybadge';
import CodePanel from '../components/Codepanel';

export default function VisualizerPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileTab, setMobileTab] = useState('visualize');
    const [showAlgoInfo, setShowAlgoInfo] = useState(true);
    const viz = useVisualizer('bubble-sort');

    useEffect(() => {
        setShowAlgoInfo(true);
    }, [viz.selectedAlgorithm]);

    const controlProps = {
        onVisualize: viz.visualize,
        onPause: viz.pause,
        onReset: viz.reset,
        isSearch: viz.isSearch,
        meta: viz.meta,
    };

    const [leftWidth, setLeftWidth] = useState(250);
    const [rightWidth, setRightWidth] = useState(280);
    const [isResizingLeft, setIsResizingLeft] = useState(false);
    const [isResizingRight, setIsResizingRight] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizingLeft) {
                setLeftWidth(Math.max(180, Math.min(e.clientX, 500)));
            } else if (isResizingRight) {
                setRightWidth(Math.max(200, Math.min(window.innerWidth - e.clientX, 600)));
            }
        };
        const handleMouseUp = () => {
            setIsResizingLeft(false);
            setIsResizingRight(false);
        };

        if (isResizingLeft || isResizingRight) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.userSelect = 'auto';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizingLeft, isResizingRight]);

    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] bg-white dark:bg-black transition-colors duration-200">
            {/* Algorithm Info Modal */}
            {showAlgoInfo && viz.meta?.algoDescription && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col w-full max-w-lg p-6 relative">
                        <button onClick={() => setShowAlgoInfo(false)} className="absolute top-4 right-4 text-black/50 dark:text-white/50 hover:text-red-500 transition-colors" aria-label="Close">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold text-black dark:text-white tracking-tight mb-2">{viz.meta.name}</h3>
                        <div className="w-8 h-1 bg-black/10 dark:bg-white/10 mb-4" />
                        <p className="text-sm text-black/80 dark:text-white/80 leading-relaxed whitespace-pre-wrap">
                            {viz.meta.algoDescription}
                        </p>
                        <button onClick={() => setShowAlgoInfo(false)} className="mt-6 self-end px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-wide hover:opacity-80 transition-opacity">
                            Got it
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center gap-3 px-4 py-2.5 border-b border-black/8 dark:border-white/8">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="min-h-[44px] min-w-[44px] border border-black/12 dark:border-white/12 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-all flex items-center justify-center"
                    aria-label="Open sidebar"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <div>
                    <span className="text-sm font-bold text-black dark:text-white tracking-tight">{viz.meta.name || 'Visualizer'}</span>
                    <span className="text-[10px] font-mono text-black/40 dark:text-white/40 uppercase tracking-widest ml-2">{viz.meta.category}</span>
                </div>
            </div>

            {/* Sidebar */}
            <Sidebar
                selectedAlgorithm={viz.selectedAlgorithm}
                onSelectAlgorithm={viz.selectAlgorithm}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                width={leftWidth}
            />

            {/* Left Resizer */}
            <div
                className="hidden lg:block w-1 hover:w-2 hover:-ml-0.5 hover:-mr-0.5 bg-transparent hover:bg-black/20 dark:hover:bg-white/20 cursor-col-resize z-50 transition-colors"
                onMouseDown={() => setIsResizingLeft(true)}
            />

            {/* Center panel */}
            <div className="flex-1 flex flex-col min-w-[300px] p-3 gap-2.5">

                {/* Desktop title */}
                <div className="hidden lg:flex items-baseline gap-3 pb-1">
                    <h1 className="text-lg font-bold text-black dark:text-white tracking-tight">{viz.meta.name || 'Visualizer'}</h1>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-black/40 dark:text-white/40">{viz.meta.category}</span>
                </div>

                {/* Desktop always-visible panels */}
                <div className="hidden lg:flex lg:flex-col gap-2.5">
                    <VisualizationCanvas stepData={viz.currentStepData} meta={viz.meta} />
                    <StepDescription stepData={viz.currentStepData} steps={viz.steps} currentStep={viz.currentStep} />
                    <ControlPanel {...controlProps} />
                </div>

                {/* Mobile: tab-driven */}
                <div className="lg:hidden flex flex-col flex-1 gap-2.5">
                    {mobileTab === 'visualize' && (
                        <>
                            <VisualizationCanvas stepData={viz.currentStepData} meta={viz.meta} />
                            <StepDescription stepData={viz.currentStepData} steps={viz.steps} currentStep={viz.currentStep} />
                            <ControlPanel {...controlProps} />
                        </>
                    )}
                    {mobileTab === 'code' && <CodePanel meta={viz.meta} />}
                    {mobileTab === 'info' && <ComplexityBadge meta={viz.meta} />}
                </div>
            </div>

            {/* Right Resizer */}
            <div
                className="hidden lg:block w-1 hover:w-2 hover:-ml-0.5 hover:-mr-0.5 bg-transparent hover:bg-black/20 dark:hover:bg-white/20 cursor-col-resize z-50 transition-colors border-l border-black/5 dark:border-white/5"
                onMouseDown={() => setIsResizingRight(true)}
            />

            {/* Right panel — desktop only */}
            <div className="hidden lg:flex flex-col gap-2.5 p-3" style={{ width: `${rightWidth}px`, minWidth: `${rightWidth}px` }}>
                <ComplexityBadge meta={viz.meta} />
                <CodePanel meta={viz.meta} />
            </div>

            {/* Mobile bottom tab bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-black/8 dark:border-white/8 z-40 transition-colors">
                <div className="flex">
                    {[
                        { key: 'visualize', label: 'Visualize', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
                        { key: 'code', label: 'Code', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
                        { key: 'info', label: 'Info', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5" /></svg> },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setMobileTab(tab.key)}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 min-h-[56px] transition-colors
                ${mobileTab === tab.key
                                    ? 'text-black dark:text-white'
                                    : 'text-black/35 dark:text-white/35 hover:text-black/60 dark:hover:text-white/60'}`}
                        >
                            {tab.icon}
                            <span className="text-[9px] font-mono uppercase tracking-widest">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="lg:hidden h-16" />
        </div>
    );
}
