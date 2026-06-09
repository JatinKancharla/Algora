export function insertionSort(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sortedIndices = new Set([0]);

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      comparing: [i],
      sorted: [...sortedIndices],
      action: 'compare',
      description: `Picking element at index ${i} (${key}) to insert into sorted portion`,
    });

    while (j >= 0 && a[j] > key) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        sorted: [...sortedIndices],
        action: 'compare',
        description: `Comparing ${a[j]} > ${key} — shifting ${a[j]} to the right`,
      });
      a[j + 1] = a[j];
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        sorted: [...sortedIndices],
        action: 'swap',
        description: `Shifted ${a[j]} from index ${j} to index ${j + 1}`,
      });
      j--;
    }
    a[j + 1] = key;
    sortedIndices.add(i);

    steps.push({
      array: [...a],
      comparing: [j + 1],
      sorted: [...sortedIndices],
      action: 'compare',
      description: `Inserted ${key} at index ${j + 1}`,
    });
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

export const insertionSortMeta = {
  algoDescription: `Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms. Applications: Used for very small datasets or as part of more complex algorithms like Timsort (used in Python and Java).`,
  name: 'Insertion Sort',
  slug: 'insertion-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  code: {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    java: `class InsertionSort {
    void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
  },
  pseudocode: `INSERTION-SORT(A)
  for i = 1 to A.length - 1
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key`,
};
