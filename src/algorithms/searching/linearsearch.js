export function linearSearch(arr, target) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...a],
      comparing: [i],
      sorted: [],
      action: 'compare',
      description: `Checking index ${i}: is ${a[i]} equal to target ${target}?`,
    });

    if (a[i] === target) {
      steps.push({
        array: [...a],
        comparing: [i],
        sorted: [i],
        action: 'done',
        description: `Found target ${target} at index ${i}!`,
      });
      return steps;
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

export const linearSearchMeta = {
  algoDescription: `Linear Search is a simple search algorithm that checks every element in the list sequentially until a match is found or the whole list has been searched. Applications: Searching in small, unsorted arrays or lists where binary search cannot be applied.`,
  name: 'Linear Search',
  slug: 'linear-search',
  category: 'searching',
  complexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
  },
  code: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
    java: `class LinearSearch {
    public static int search(int arr[], int x) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            if (arr[i] == x) return i;
        }
        return -1;
    }
}`,
  },
  pseudocode: `LINEAR-SEARCH(A, target)
  for i = 0 to A.length - 1
    if A[i] == target
      return i
  return -1`,
};
