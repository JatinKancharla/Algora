/**
 * Circular Linked List visualization.
 */
export function circularLinkedListVis(payload) {
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
  steps.push({ array: [], comparing: [], sorted: [], action: 'compare', description: `Initialized empty Circular Linked List. Head = null.` });

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
          ? `Created Head Node -> [${op.val} | next: points to itself (Head)]`
          : `Created Node -> [${op.val}]. Linked previous node's next to it, and its next to Head.`,
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
            description: `Traversed list circularly. Found Node [${removed}]. Bypassing this node...`,
          });
          list.splice(foundIdx, 1);
          steps.push({
            array: [...list],
            comparing: [],
            sorted: [],
            action: 'swap',
            description: `Deleted Node [${removed}]. Circular pointer maintained.`,
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
    description: `Circular Linked List operations complete.`,
  });

  return steps;
}

export const circularLinkedListMeta = {
  algoDescription: `A Circular Linked List is a linked list where all nodes are connected to form a circle. There is no NULL at the end. Applications: Useful for applications that need to repeatedly go around a list, like round-robin scheduling in operating systems or multiplayer board games.`,
  name: 'Circular Linked List',
  slug: 'circular-linked-list',
  category: 'data-structures',
  complexity: {
    best: 'O(1) insert tail',
    average: 'O(n) access',
    worst: 'O(n) search',
    space: 'O(n)',
  },
  code: {
    javascript: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}
// Tail node's next always points to Head`,
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
# tail.next = head`,
    cpp: `struct Node {
    int val;
    Node* next;
};
// tail->next = head;`,
    java: `class CircularLinkedList {
    static class Node {
        int data; Node next;
    }
    static Node push(Node head_ref, int data) {
        Node ptr1 = new Node();
        ptr1.data = data;
        ptr1.next = head_ref;
        // logic to link last node to ptr1
        return ptr1;
    }
}`,
  },
  pseudocode: `APPEND(head, tail, val)
  newNode = allocate Node(val)
  if head == null
    head = tail = newNode
    newNode.next = head
    return
  tail.next = newNode
  tail = newNode
  tail.next = head`,
};
