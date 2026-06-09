/**
 * Singly Linked List visualization.
 * We visualize it in 'array' mode, where the sequence represents nodes.
 * The text description clarifies that they are linked.
 */
export function singlyLinkedListVis(payload) {
  const steps = [];
  
  let size = 15; // Max node capacity
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
  steps.push({ array: [], comparing: [], sorted: [], action: 'compare', description: `Initialized empty Singly Linked List. Head = null.` });

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
          ? `Created Head Node -> [${op.val} | next: null]`
          : `Created Node -> [${op.val} | next: null]. Linked previous node's next to it.`,
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
            description: `Traversed list. Found Node [${removed}]. Updating next pointer of previous node...`,
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
    description: `Singly Linked List operations complete.`,
  });

  return steps;
}

export const singlyLinkedListMeta = {
  algoDescription: `A Singly Linked List is a linear data structure wherein elements are not stored in contiguous memory locations. Each element is a separate object consisting of data and a reference to the next node. Applications: Implementing stacks and queues, dynamic memory allocation, and representing sparse matrices.`,
  name: 'Singly Linked List',
  slug: 'singly-linked-list',
  category: 'data-structures',
  complexity: {
    best: 'O(1) insert head',
    average: 'O(n) access/search',
    worst: 'O(n) insert tail',
    space: 'O(n)',
  },
  code: {
    javascript: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}
class LinkedList {
  constructor() { this.head = null; }
  append(val) {
    const newNode = new Node(val);
    if (!this.head) { this.head = newNode; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = newNode;
  }
}`,
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
class LinkedList:
    def __init__(self):
        self.head = None`,
    cpp: `struct Node {
    int val;
    Node* next;
    Node(int x) : val(x), next(nullptr) {}
};`,
    java: `class LinkedList {
    Node head;
    class Node {
        int data; Node next;
        Node(int d) { data = d; next = null; }
    }
    public void push(int new_data) {
        Node new_node = new Node(new_data);
        new_node.next = head;
        head = new_node;
    }
}`,
  },
  pseudocode: `APPEND(head, val)
  newNode = allocate Node(val)
  if head == null
    head = newNode
    return
  curr = head
  while curr.next != null
    curr = curr.next
  curr.next = newNode`,
};
