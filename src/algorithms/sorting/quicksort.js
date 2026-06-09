export function quickSort(arr) {
  const steps = [];
  const a = [...arr];

  function partition(a, low, high) {
    const pivot = a[high];
    steps.push({
      array: [...a],
      comparing: [high],
      sorted: [],
      action: 'compare',
      description: `Choosing pivot: ${pivot} at index ${high}`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...a],
        comparing: [j, high],
        sorted: [],
        action: 'compare',
        description: `Comparing ${a[j]} with pivot ${pivot}`,
      });

      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          array: [...a],
          comparing: [i, j],
          sorted: [],
          action: 'swap',
          description: `${a[j]} < ${pivot}, swapped index ${i} and ${j}`,
        });
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      array: [...a],
      comparing: [i + 1, high],
      sorted: [],
      action: 'swap',
      description: `Placed pivot ${pivot} at its correct position (index ${i + 1})`,
    });

    return i + 1;
  }

  function sort(a, low, high) {
    if (low < high) {
      const pi = partition(a, low, high);
      sort(a, low, pi - 1);
      sort(a, pi + 1, high);
    }
  }

  sort(a, 0, a.length - 1);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: Array.from({ length: a.length }, (_, i) => i),
    action: 'done',
    description: 'Array is fully sorted!',
  });

  return steps;
}

export const quickSortMeta = {
  algoDescription: `Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. Applications: Often the preferred sorting algorithm for in-memory arrays in programming libraries due to its average-case efficiency.`,
  name: 'Quick Sort',
  slug: 'quick-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
  },
  code: {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
    cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    java: `class QuickSort {
    int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }
    void sort(int arr[], int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
}`,
  },
  pseudocode: `QUICK-SORT(A, low, high)
  if low < high
    pi = PARTITION(A, low, high)
    QUICK-SORT(A, low, pi - 1)
    QUICK-SORT(A, pi + 1, high)

PARTITION(A, low, high)
  pivot = A[high]
  i = low - 1
  for j = low to high - 1
    if A[j] < pivot
      i = i + 1
      swap A[i] and A[j]
  swap A[i+1] and A[high]
  return i + 1`,
};
