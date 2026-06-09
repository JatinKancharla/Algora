export function heapSort(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  function heapify(a, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      steps.push({
        array: [...a],
        comparing: [largest, left],
        sorted: [],
        action: 'compare',
        description: `Heapify: comparing parent ${a[largest]} (idx ${largest}) with left child ${a[left]} (idx ${left})`,
      });
      if (a[left] > a[largest]) largest = left;
    }

    if (right < n) {
      steps.push({
        array: [...a],
        comparing: [largest, right],
        sorted: [],
        action: 'compare',
        description: `Heapify: comparing current largest ${a[largest]} (idx ${largest}) with right child ${a[right]} (idx ${right})`,
      });
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({
        array: [...a],
        comparing: [i, largest],
        sorted: [],
        action: 'swap',
        description: `Swapped ${a[largest]} and ${a[i]} to maintain heap property`,
      });
      heapify(a, n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...a],
      comparing: [i],
      sorted: [],
      action: 'compare',
      description: `Building max heap: heapifying subtree rooted at index ${i}`,
    });
    heapify(a, n, i);
  }

  // Extract elements from heap
  const sortedIndices = new Set();
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    sortedIndices.add(i);
    steps.push({
      array: [...a],
      comparing: [0, i],
      sorted: [...sortedIndices],
      action: 'swap',
      description: `Extracted max ${a[i]} — swapped root with index ${i}`,
    });
    heapify(a, i, 0);
  }
  sortedIndices.add(0);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: 'done',
    description: 'Array is fully sorted!',
  });

  return steps;
}

export const heapSortMeta = {
  algoDescription: `Heap Sort is a comparison-based sorting technique based on a Binary Heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element. Applications: Used when a reliable O(n log n) time complexity is required, as it does not have the worst-case O(n^2) behavior of Quick Sort.`,
  name: 'Heap Sort',
  slug: 'heap-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
  },
  code: {
    javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n/2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let l = 2*i + 1, r = 2*i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    l, r = 2*i + 1, 2*i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2*i + 1, r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n/2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    java: `class HeapSort {
    public void sort(int arr[]) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    void heapify(int arr[], int n, int i) {
        // implementation of heapify
    }
}`,
  },
  pseudocode: `HEAP-SORT(A)
  BUILD-MAX-HEAP(A)
  for i = A.length - 1 downto 1
    swap A[0] and A[i]
    HEAPIFY(A, i, 0)

HEAPIFY(A, n, i)
  largest = i
  l = 2*i + 1, r = 2*i + 2
  if l < n and A[l] > A[largest]: largest = l
  if r < n and A[r] > A[largest]: largest = r
  if largest ≠ i
    swap A[i] and A[largest]
    HEAPIFY(A, n, largest)`,
};
