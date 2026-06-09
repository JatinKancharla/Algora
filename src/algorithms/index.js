// Sorting
import { bubbleSort, bubbleSortMeta } from './sorting/bubblesort';
import { selectionSort, selectionSortMeta } from './sorting/selectionsort';
import { insertionSort, insertionSortMeta } from './sorting/insertionsort';
import { mergeSort, mergeSortMeta } from './sorting/mergesort';
import { quickSort, quickSortMeta } from './sorting/quicksort';
import { heapSort, heapSortMeta } from './sorting/heapsort';

// Searching
import { linearSearch, linearSearchMeta } from './searching/linearsearch';
import { binarySearch, binarySearchMeta } from './searching/binaryseearch';

// Graphs
import { bfs, bfsMeta } from './graphs/bfs';
import { dfs, dfsMeta } from './graphs/dfs';
import { dijkstra, dijkstraMeta } from './graphs/dijkstra';

// Trees
import { bstInsert, bstInsertMeta } from './trees/bst';
import { inorderTraversal, inorderMeta } from './trees/inorder';
import { preorderTraversal, preorderMeta } from './trees/preorder';
import { postorderTraversal, postorderMeta } from './trees/postorder';

// Data Structures
import { dynamicArrayVis, dynamicArrayMeta } from './datastructures/dynamicarray';
import { stackVis, stackMeta } from './datastructures/stack';
import { queueVis, queueMeta } from './datastructures/queue';
import { priorityQueueVis, priorityQueueMeta } from './datastructures/priorityqueue';
import { circularQueueVis, circularQueueMeta } from './datastructures/circularqueue';
import { singlyLinkedListVis, singlyLinkedListMeta } from './datastructures/singlylinkedlist';
import { doublyLinkedListVis, doublyLinkedListMeta } from './datastructures/doublylinkedlist';
import { circularLinkedListVis, circularLinkedListMeta } from './datastructures/circularlinkedlist';


export const algorithms = {
  // Sorting
  'bubble-sort':    { run: bubbleSort,    meta: bubbleSortMeta },
  'selection-sort': { run: selectionSort, meta: selectionSortMeta },
  'insertion-sort': { run: insertionSort, meta: insertionSortMeta },
  'merge-sort':     { run: mergeSort,     meta: mergeSortMeta },
  'quick-sort':     { run: quickSort,     meta: quickSortMeta },
  'heap-sort':      { run: heapSort,      meta: heapSortMeta },

  // Searching — these take (arr, target) but we wrap them below
  'linear-search':  { run: linearSearch,  meta: linearSearchMeta,  isSearch: true },
  'binary-search':  { run: binarySearch,  meta: binarySearchMeta,  isSearch: true },

  // Graphs
  'bfs':            { run: bfs,            meta: bfsMeta },
  'dfs':            { run: dfs,            meta: dfsMeta },
  'dijkstra':       { run: dijkstra,       meta: dijkstraMeta },

  // Trees
  'bst-insert':     { run: bstInsert,      meta: bstInsertMeta },
  'inorder':        { run: inorderTraversal, meta: inorderMeta },
  'preorder':       { run: preorderTraversal, meta: preorderMeta },
  'postorder':      { run: postorderTraversal, meta: postorderMeta },

  // Data Structures
  'dynamic-array':        { run: dynamicArrayVis,       meta: dynamicArrayMeta },
  'stack':                { run: stackVis,              meta: stackMeta },
  'queue':                { run: queueVis,              meta: queueMeta },
  'priority-queue':       { run: priorityQueueVis,      meta: priorityQueueMeta },
  'circular-queue':       { run: circularQueueVis,      meta: circularQueueMeta },
  'singly-linked-list':   { run: singlyLinkedListVis,   meta: singlyLinkedListMeta },
  'doubly-linked-list':   { run: doublyLinkedListVis,   meta: doublyLinkedListMeta },
  'circular-linked-list': { run: circularLinkedListVis, meta: circularLinkedListMeta },
};

export const algorithmCategories = [
  {
    name: 'Sorting',
    slug: 'sorting',
    items: [
      bubbleSortMeta,
      selectionSortMeta,
      insertionSortMeta,
      mergeSortMeta,
      quickSortMeta,
      heapSortMeta,
    ],
  },
  {
    name: 'Searching',
    slug: 'searching',
    items: [
      linearSearchMeta,
      binarySearchMeta,
    ],
  },
  {
    name: 'Data Structures',
    slug: 'data-structures',
    items: [
      dynamicArrayMeta,
      stackMeta,
      queueMeta,
      priorityQueueMeta,
      circularQueueMeta,
      singlyLinkedListMeta,
      doublyLinkedListMeta,
      circularLinkedListMeta,
      bfsMeta,
      dfsMeta,
      dijkstraMeta,
      bstInsertMeta,
      inorderMeta,
      preorderMeta,
      postorderMeta,
    ],
  },
];
