/**
 * Doubly Linked List visualization.
 */
export function doublyLinkedListVis(payload) {
  const steps = [];
  
  let size = 15;
  let ops = [];

  if (Array.isArray(payload)) {
    ops = payload.map(v => ({ type: 'insert', val: v }));
  } else if (payload && typeof payload === 'object') {
    size = payload.size || 15;
    ops = payload.ops || [];
  }

  if (ops.length === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty operations list.' });
    return steps;
  }

  const list = [];
  steps.push({ array: [], comparing: [], sorted: [], action: 'compare', description: `Initialized empty Doubly Linked List. Head = null.` });

  for (const op of ops) {
    if (op.type === 'insert') {
      if (list.length >= size) {
        steps.push({
          array: [...list], comparing: [], sorted: [], action: 'compare',
          description: `Attempted to Insert(${op.val}), but reached Capacity limit!`,
        });
        continue;
      }
      list.push(op.val);
      const isFirst = list.length === 1;
      steps.push({
        array: [...list],
        comparing: [list.length - 1],
        sorted: [],
        action: 'swap',
        description: isFirst 
          ? `Created Head Node -> [prev: null | ${op.val} | next: null]`
          : `Created Node -> [prev: Node ${list[list.length-2]} | ${op.val} | next: null]. Updated previous node's next.`,
      });
    } else if (op.type === 'delete') {
      if (list.length === 0) {
        steps.push({
          array: [...list], comparing: [], sorted: [], action: 'compare',
          description: `Attempted to Delete(), but list is empty!`,
        });
      } else {
        const valToFind = op.val !== undefined ? Number(op.val) : null;
        let foundIdx = list.length - 1;

        if (valToFind !== null) {
          foundIdx = list.indexOf(valToFind);
        }

        if (valToFind !== null && foundIdx === -1) {
          steps.push({
            array: [...list], comparing: [], sorted: [], action: 'compare',
            description: `Attempted to Delete(${valToFind}), but value does not exist!`,
          });
        } else {
          const removed = list[foundIdx];
          steps.push({
            array: [...list],
            comparing: [foundIdx],
            sorted: [],
            action: 'compare',
            description: `Traversed list. Found Node [${removed}]. Updating next pointer of previous node and prev pointer of next node...`,
          });
          list.splice(foundIdx, 1);
          steps.push({
            array: [...list],
            comparing: [],
            sorted: [],
            action: 'swap',
            description: `Deleted Node [${removed}].`,
          });
        }
      }
    }
  }

  steps.push({
    array: [...list],
    comparing: [],
    sorted: Array.from({ length: list.length }, (_, i) => i),
    action: 'done',
    description: `Doubly Linked List operations complete.`,
  });

  return steps;
}

export const doublyLinkedListMeta = {
  algoDescription: `A Doubly Linked List is a linked data structure that consists of a set of sequentially linked records called nodes. Each node contains a link to both the previous and the next node. Applications: Used in navigation systems (forward and backward navigation), undo/redo operations in text editors, and implementing complex data structures like Fibonacci heaps.`,
  name: 'Doubly Linked List',
  slug: 'doubly-linked-list',
  category: 'data-structures',
  complexity: {
    best: 'O(1) insert head/tail',
    average: 'O(n) access/search',
    worst: 'O(n) search',
    space: 'O(n)',
  },
  code: {
    javascript: `class Node {
  constructor(val) { this.val = val; this.next = null; this.prev = null; }
}`,
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None`,
    cpp: `struct Node {
    int val;
    Node* next;
    Node* prev;
};`,
    java: `class DoublyLinkedList {
    Node head;
    class Node {
        int data; Node prev, next;
        Node(int d) { data = d; }
    }
    public void push(int new_data) {
        Node new_Node = new Node(new_data);
        new_Node.next = head;
        new_Node.prev = null;
        if (head != null) head.prev = new_Node;
        head = new_Node;
    }
}`,
  },
  pseudocode: `APPEND(tail, val)
  newNode = allocate Node(val)
  if tail == null
    head = tail = newNode
    return
  tail.next = newNode
  newNode.prev = tail
  tail = newNode`,
};
