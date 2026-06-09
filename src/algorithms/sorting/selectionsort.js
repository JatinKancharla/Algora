export function selectionSort(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        comparing: [minIdx, j],
        sorted: [...sortedIndices],
        action: 'compare',
        description: `Comparing current min index ${minIdx} (${a[minIdx]}) with index ${j} (${a[j]})`,
      });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...a],
          comparing: [minIdx],
          sorted: [...sortedIndices],
          action: 'compare',
          description: `New minimum found at index ${minIdx} (${a[minIdx]})`,
        });
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        array: [...a],
        comparing: [i, minIdx],
        sorted: [...sortedIndices],
        action: 'swap',
        description: `Swapped index ${i} and index ${minIdx} — placing ${a[i]} in position`,
      });
    }
    sortedIndices.add(i);
  }
  sortedIndices.add(n - 1);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: 'done',
    description: 'Array is fully sorted!',
  });

  return steps;
}

export const selectionSortMeta = {
  algoDescription: `Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist. Applications: Useful when memory write operations are costly, as it minimizes the number of swaps.`,
  name: 'Selection Sort',
  slug: 'selection-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  code: {
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    java: `class SelectionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            int min_idx = i;
            for (int j = i+1; j < n; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
  },
  pseudocode: `SELECTION-SORT(A)
  for i = 0 to A.length - 2
    minIdx = i
    for j = i + 1 to A.length - 1
      if A[j] < A[minIdx]
        minIdx = j
    swap A[i] and A[minIdx]`,
};
