import { useState, useCallback, useRef, useEffect } from 'react';
import { algorithms } from '../algorithms';

function generateRandomArray(size = 14) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

const STEP_INTERVAL_MS = 550;

export function useVisualizer(initialAlgorithm = 'bubble-sort') {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(initialAlgorithm);
  const [array, setArray] = useState(() => generateRandomArray());
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const clearPlay = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setIsPlaying(false);
  }, []);

  // Generate steps for current array + algo
  const generateSteps = useCallback((arr, algoSlug) => {
    const algo = algorithms[algoSlug];
    if (!algo) return;
    let newSteps;
    if (algo.isSearch) {
      // For searching, pick a random target from the array
      const target = arr[Math.floor(Math.random() * arr.length)];
      newSteps = algo.run([...arr], target);
    } else {
      newSteps = algo.run([...arr]);
    }
    setSteps(newSteps);
    setCurrentStep(0);
    clearPlay();
  }, [clearPlay]);

  useEffect(() => {
    generateSteps(array, selectedAlgorithm);
  }, [array, selectedAlgorithm, generateSteps]);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, STEP_INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, steps.length]);

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) return;
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const pause = useCallback(() => clearPlay(), [clearPlay]);

  const stepForward = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => { clearPlay(); setCurrentStep(0); }, [clearPlay]);

  const selectAlgorithm = useCallback((slug) => {
    clearPlay();
    setSelectedAlgorithm(slug);
    try {
      const visited = JSON.parse(localStorage.getItem('algora-visited') || '[]');
      if (!visited.includes(slug)) {
        localStorage.setItem('algora-visited', JSON.stringify([...visited, slug]));
      }
    } catch {}
  }, [clearPlay]);

  /**
   * visualize(inputStr) — called when user clicks Visualize.
   * For searching: format is "arr;target" e.g. "15,42,7,33;42"
   * For others: just comma-separated values
   * Empty string → use random array
   */
  const visualize = useCallback((inputStr = '') => {
    clearPlay();
    const algo = algorithms[selectedAlgorithm];
    if (!algo) return;

    let arr = array;
    let target = null;
    let dsPayload = null;

    if (inputStr.trim()) {
      if (inputStr.startsWith('json:')) {
        try {
          dsPayload = JSON.parse(inputStr.replace('json:', ''));
        } catch(e) {
          console.error(e);
        }
      } else if (algo.isSearch && inputStr.includes(';')) {
        const [arrPart, targetPart] = inputStr.split(';');
        const parsed = arrPart.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0 && n <= 999).slice(0, 24);
        target = parseInt(targetPart.trim(), 10);
        if (parsed.length >= 2 && !isNaN(target)) {
          arr = parsed;
          setArray(parsed);
        }
      } else {
        const parsed = inputStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0 && n <= 999).slice(0, 24);
        if (parsed.length >= 2) {
          arr = parsed;
          setArray(parsed);
        }
      }
    }

    let newSteps;
    if (dsPayload) {
      newSteps = algo.run(dsPayload);
    } else if (algo.isSearch) {
      if (target === null || isNaN(target)) {
        target = arr[Math.floor(Math.random() * arr.length)];
      }
      newSteps = algo.run([...arr], target);
    } else {
      newSteps = algo.run([...arr]);
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setTimeout(() => setIsPlaying(true), 50);
  }, [array, selectedAlgorithm, clearPlay]);

  const randomize = useCallback(() => {
    clearPlay();
    const size = Math.floor(Math.random() * 6) + 12;
    setArray(generateRandomArray(size));
  }, [clearPlay]);

  const isSearch = algorithms[selectedAlgorithm]?.isSearch || false;

  const currentStepData = steps[currentStep] ?? {
    array, comparing: [], sorted: [], action: 'idle',
    description: 'Enter values below and click Visualize to start',
  };

  const meta = algorithms[selectedAlgorithm]?.meta ?? {};

  return {
    selectedAlgorithm, selectAlgorithm,
    array, steps, currentStep, currentStepData,
    isPlaying, play, pause, stepForward, stepBackward, reset,
    randomize, visualize, isSearch,
    meta, totalSteps: steps.length,
  };
}
