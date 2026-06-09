export function binarySearch(arr, target) {
  const steps = [];
  const a = [...arr].sort((x, y) => x - y); // binary search needs sorted array
  let left = 0;
  let right = a.length - 1;

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [],
    action: 'compare',
    description: `Array sorted for binary search. Searching for target ${target}. Left=${left}, Right=${right}.`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...a],
      comparing: [mid],
      sorted: [],
      action: 'compare',
      description: `Checking mid index ${mid}: value ${a[mid]}. Left=${left}, Right=${right}.`,
    });

    if (a[mid] === target) {
      steps.push({
        array: [...a],
        comparing: [mid],
        sorted: [mid],
        action: 'done',
        description: `Found target ${target} at index ${mid}!`,
      });
      return steps;
    } else if (a[mid] < target) {
      steps.push({
        array: [...a],
        comparing: [mid],
        sorted: [],
        action: 'swap', // reusing 'swap' to indicate narrowing
        description: `${a[mid]} < ${target}, so target is in the right half. Moving left to ${mid + 1}.`,
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...a],
        comparing: [mid],
        sorted: [],
        action: 'swap',
        description: `${a[mid]} > ${target}, so target is in the left half. Moving right to ${mid - 1}.`,
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [],
    action: 'done',
    description: `Target ${target} not found in the array.`,
  });

  return steps;
}

export const binarySearchMeta = {
  algoDescription: `Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item. Applications: Finding elements in a sorted array, debugging (git bisect), and searching in databases.`,
  name: 'Binary Search',
  slug: 'binary-search',
  category: 'searching',
  complexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
  },
  code: {
    javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    cpp: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    java: `class BinarySearch {
    int binarySearch(int arr[], int x) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == x) return m;
            if (arr[m] < x) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}`,
  },
  pseudocode: `BINARY-SEARCH(A, target)
  left = 0, right = A.length - 1
  while left <= right
    mid = floor((left + right) / 2)
    if A[mid] == target
      return mid
    else if A[mid] < target
      left = mid + 1
    else
      right = mid - 1
  return -1`,
};
