export function mergeSort(arr) {
  const steps = [];
  const a = [...arr];

  function merge(a, left, mid, right) {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...a],
        comparing: [left + i, mid + 1 + j],
        sorted: [],
        action: 'compare',
        description: `Merging: comparing ${leftArr[i]} (left) and ${rightArr[j]} (right)`,
      });
      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
      } else {
        a[k] = rightArr[j];
        j++;
      }
      steps.push({
        array: [...a],
        comparing: [k],
        sorted: [],
        action: 'swap',
        description: `Placed ${a[k]} at index ${k}`,
      });
      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];
      steps.push({
        array: [...a],
        comparing: [k],
        sorted: [],
        action: 'swap',
        description: `Placed remaining left element ${a[k]} at index ${k}`,
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];
      steps.push({
        array: [...a],
        comparing: [k],
        sorted: [],
        action: 'swap',
        description: `Placed remaining right element ${a[k]} at index ${k}`,
      });
      j++;
      k++;
    }
  }

  function sort(a, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        array: [...a],
        comparing: [left, right],
        sorted: [],
        action: 'compare',
        description: `Dividing array from index ${left} to ${right} (mid = ${mid})`,
      });
      sort(a, left, mid);
      sort(a, mid + 1, right);
      merge(a, left, mid, right);
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

export const mergeSortMeta = {
  algoDescription: `Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. Applications: Ideal for sorting linked lists and large datasets that don't fit into memory (external sorting).`,
  name: 'Merge Sort',
  slug: 'merge-sort',
  category: 'sorting',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
  },
  code: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
    cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l+i];
    for (int j = 0; j < n2; j++) R[j] = arr[m+1+j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    java: `class MergeSort {
    void merge(int arr[], int l, int m, int r) {
        // Implementation of merge
    }
    void sort(int arr[], int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
}`,
  },
  pseudocode: `MERGE-SORT(A, left, right)
  if left < right
    mid = floor((left + right) / 2)
    MERGE-SORT(A, left, mid)
    MERGE-SORT(A, mid + 1, right)
    MERGE(A, left, mid, right)`,
};
