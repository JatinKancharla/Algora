const fs = require('fs');
const path = require('path');

const descriptions = {
  // Trees
  'bst.js': 'A Binary Search Tree is a node-based binary tree data structure where each node has at most two children. The left subtree contains only nodes with keys lesser than the node’s key, and the right subtree contains nodes with greater keys. Applications: Used in many search applications where data is constantly entering/leaving, such as in map and set objects in many languages.',
  'postorder.js': 'Post-order Traversal is a depth-first algorithm that visits the left subtree, then the right subtree, and finally the root node. Applications: Used to delete the tree, as it ensures child nodes are deleted before parent nodes. Also used to get the postfix expression of an expression tree.',
  'inorder.js': 'In-order Traversal is a depth-first algorithm that visits the left subtree, the root node, and then the right subtree. Applications: For a Binary Search Tree (BST), in-order traversal retrieves the keys in ascending sorted order.',
  'preorder.js': 'Pre-order Traversal is a depth-first algorithm that visits the root node, then the left subtree, and finally the right subtree. Applications: Used to create a copy of the tree. Also used to get prefix expression of an expression tree.',
  
  // Data Structures
  'priorityqueue.js': 'A Priority Queue is an abstract data type similar to a regular queue or stack, but where additionally each element has a "priority" associated with it. Elements with higher priority are served before those with lower priority. Applications: CPU scheduling, Dijkstra\'s shortest path algorithm, and A* search algorithm.',
  'queue.js': 'A Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear and removed from the front. Applications: Task scheduling in operating systems, handling asynchronous requests (like IO buffers), and Breadth-First Search (BFS) in graphs.',
  'circularlinkedlist.js': 'A Circular Linked List is a linked list where all nodes are connected to form a circle. There is no NULL at the end. Applications: Useful for applications that need to repeatedly go around a list, like round-robin scheduling in operating systems or multiplayer board games.',
  'circularqueue.js': 'A Circular Queue is a linear data structure where the last position is connected back to the first position to make a circle. It overcomes the limitation of unutilized space in a standard queue. Applications: Memory management, traffic system coordination, and CPU scheduling.',
  'dynamicarray.js': 'A Dynamic Array (or arraylist) is a random access, variable-size list data structure that allows elements to be added or removed. It resizes itself automatically when it gets full. Applications: Implementing lists in programming languages (like Python\'s list or Java\'s ArrayList), and maintaining dynamic collections of elements.',
  'doublylinkedlist.js': 'A Doubly Linked List is a linked data structure that consists of a set of sequentially linked records called nodes. Each node contains a link to both the previous and the next node. Applications: Used in navigation systems (forward and backward navigation), undo/redo operations in text editors, and implementing complex data structures like Fibonacci heaps.',
  'singlylinkedlist.js': 'A Singly Linked List is a linear data structure wherein elements are not stored in contiguous memory locations. Each element is a separate object consisting of data and a reference to the next node. Applications: Implementing stacks and queues, dynamic memory allocation, and representing sparse matrices.',
  'stack.js': 'A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top. Applications: Function call management (call stack) in programming, undo mechanisms in text editors, and syntax parsing/evaluating expressions.',
  
  // Searching
  'binaryseearch.js': 'Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item. Applications: Finding elements in a sorted array, debugging (git bisect), and searching in databases.',
  'linearsearch.js': 'Linear Search is a simple search algorithm that checks every element in the list sequentially until a match is found or the whole list has been searched. Applications: Searching in small, unsorted arrays or lists where binary search cannot be applied.',
  
  // Sorting
  'quicksort.js': 'Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. Applications: Often the preferred sorting algorithm for in-memory arrays in programming libraries due to its average-case efficiency.',
  'insertionsort.js': 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms. Applications: Used for very small datasets or as part of more complex algorithms like Timsort (used in Python and Java).',
  'selectionsort.js': 'Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist. Applications: Useful when memory write operations are costly, as it minimizes the number of swaps.',
  'bubblesort.js': 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Applications: Primarily used for educational purposes to introduce the concept of a sorting algorithm. Rarely used in practice.',
  'mergesort.js': 'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. Applications: Ideal for sorting linked lists and large datasets that don\'t fit into memory (external sorting).',
  'heapsort.js': 'Heap Sort is a comparison-based sorting technique based on a Binary Heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element. Applications: Used when a reliable O(n log n) time complexity is required, as it does not have the worst-case O(n^2) behavior of Quick Sort.',
  
  // Graphs
  'dijkstra.js': 'Dijkstra\'s Algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. Applications: GPS navigation systems, network routing protocols (like OSPF), and telecommunication networks.',
  'dfs.js': 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. Applications: Topological sorting, finding connected components, solving puzzles (like mazes), and cycle detection.',
  'bfs.js': 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Applications: Shortest path in unweighted graphs, web crawlers, and finding peer-to-peer networks.'
};

const srcDir = path.join(__dirname, 'src', 'algorithms');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') && !file.endsWith('index.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  const filename = path.basename(file);
  const desc = descriptions[filename];
  if (!desc) {
    console.log('No description for', filename);
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the meta export
  const metaRegex = /(export const \w+Meta = \{)([\s\S]*?)(\n\};)/;
  const match = content.match(metaRegex);
  if (match) {
    if (match[2].includes('algoDescription: `')) {
      console.log('Description already exists in', filename);
      return;
    }
    const newContent = content.replace(metaRegex, `$1\n  algoDescription: \`${desc}\`,$2$3`);
    fs.writeFileSync(file, newContent);
    console.log('Added algoDescription to', filename);
  } else {
    console.log('Meta export not found in', filename);
  }
});
