/**
 * Queue visualization.
 * Enqueues all elements, then dequeues half of them.
 */
export function queueVis(payload) {
  const steps = [];
  
  let size = 5;
  let ops = [];

  if (Array.isArray(payload)) {
    size = Math.max(5, payload.length);
    ops = payload.map(v => ({ type: 'enqueue', val: v }));
    for (let i = 0; i < payload.length / 2; i++) ops.push({ type: 'dequeue' });
  } else if (payload && typeof payload === 'object') {
    size = payload.size || 5;
    ops = payload.ops || [];
  }

  if (ops.length === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty operations list.' });
    return steps;
  }

  const queue = [];

  for (const op of ops) {
    if (op.type === 'enqueue') {
      if (queue.length >= size) {
        steps.push({
          array: [...queue],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Enqueue(${op.val}), but Queue Overflow occurred! (Capacity: ${size})`,
        });
      } else {
        queue.push(op.val);
        steps.push({
          array: [...queue],
          comparing: [queue.length - 1],
          sorted: [],
          action: 'swap',
          description: `Enqueue(${op.val}). Added to rear of queue at index ${queue.length - 1}.`,
        });
      }
    } else if (op.type === 'dequeue') {
      if (queue.length === 0) {
        steps.push({
          array: [...queue],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Dequeue(), but Queue Underflow occurred! (Queue is empty)`,
        });
      } else {
        const valToFind = op.val !== undefined ? Number(op.val) : null;
        let foundIdx = 0; // Default to front

        if (valToFind !== null) {
          foundIdx = queue.indexOf(valToFind);
        }

        if (valToFind !== null && foundIdx === -1) {
          steps.push({
            array: [...queue],
            comparing: [],
            sorted: [],
            action: 'compare',
            description: `Attempted to Dequeue(${valToFind}), but value does not exist!`,
          });
        } else {
          steps.push({
            array: [...queue],
            comparing: [foundIdx],
            sorted: [],
            action: 'compare',
            description: `Preparing to Dequeue() value ${queue[foundIdx]}.`,
          });
          const removed = queue[foundIdx];
          queue.splice(foundIdx, 1);
          steps.push({
            array: [...queue],
            comparing: [],
            sorted: [],
            action: 'swap',
            description: `Dequeued ${removed}. Remaining size: ${queue.length}.`,
          });
        }
      }
    }
  }

  steps.push({
    array: [...queue],
    comparing: [],
    sorted: Array.from({ length: queue.length }, (_, i) => i),
    action: 'done',
    description: `Queue operations complete.`,
  });

  return steps;
}

export const queueMeta = {
  algoDescription: `A Queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear and removed from the front. Applications: Task scheduling in operating systems, handling asynchronous requests (like IO buffers), and Breadth-First Search (BFS) in graphs.`,
  name: 'Queue',
  slug: 'queue',
  category: 'data-structures',
  complexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(n)',
  },
  code: {
    javascript: `class Queue {
  constructor() { this.items = []; }
  enqueue(element) { this.items.push(element); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
}`,
    python: `from collections import deque
class Queue:
    def __init__(self):
        self.items = deque()
    def enqueue(self, item):
        self.items.append(item)
    def dequeue(self):
        return self.items.popleft()`,
    cpp: `#include <queue>
queue<int> q;
q.push(10);
int front = q.front();
q.pop();`,
    java: `class Queue {
    int front, rear, size;
    int capacity;
    int array[];
    void enqueue(int item) {
        if (isFull(this)) return;
        this.rear = (this.rear + 1) % this.capacity;
        this.array[this.rear] = item;
        this.size = this.size + 1;
    }
    int dequeue() {
        if (isEmpty(this)) return Integer.MIN_VALUE;
        int item = this.array[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.size = this.size - 1;
        return item;
    }
}`,
  },
  pseudocode: `QUEUE
ENQUEUE(Q, x)
  Q[Q.tail] = x
  Q.tail = Q.tail + 1

DEQUEUE(Q)
  x = Q[Q.head]
  Q.head = Q.head + 1
  return x`,
};
