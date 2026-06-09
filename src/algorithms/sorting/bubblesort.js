export function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        sorted: [...sortedIndices],
        action: 'compare',
        description: `Comparing index ${j} (${a[j]}) and index ${j + 1} (${a[j + 1]})`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          sorted: [...sortedIndices],
          action: 'swap',
          description: `Swapped ${a[j + 1]} and ${a[j]} because ${a[j + 1]} > ${a[j]}`,
        });
      }
    }
    sortedIndices.add(n - i - 1);
  }

  steps.push({
    array: [...a],
    comparing: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: 'done',
    description: 'Array is fully sorted!',
  });

  return steps;
}

export const bubbleSortMeta = {
  algoDescription: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Applications: Primarily used for educational purposes to introduce the concept of a sorting algorithm. Rarely used in practice.`,
  name: 'Bubble Sort',
  slug: 'bubble-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  code: {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
    java: `class BubbleSort {
    void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }
}`,
  },
  pseudocode: `BUBBLE-SORT(A)
  for i = 0 to A.length - 1
    for j = 0 to A.length - i - 2
      if A[j] > A[j+1]
        swap A[j] and A[j+1]`,
};
