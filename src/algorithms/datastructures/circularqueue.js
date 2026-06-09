/**
 * Circular Queue visualization.
 * We simulate a fixed-size buffer of 8 elements.
 */
export function circularQueueVis(payload) {
  const steps = [];
  
  let CAPACITY = 8;
  let ops = [];

  if (Array.isArray(payload)) {
    CAPACITY = 8;
    ops = payload.map(v => ({ type: 'enqueue', val: v }));
    for (let i = 0; i < payload.length / 2; i++) ops.push({ type: 'dequeue' });
  } else if (payload && typeof payload === 'object') {
    CAPACITY = payload.size || 8;
    ops = payload.ops || [];
  }

  if (ops.length === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty operations list.' });
    return steps;
  }

  // Initialize with nulls to represent empty slots in the canvas
  const cq = new Array(CAPACITY).fill('-');
  let front = -1;
  let rear = -1;
  let count = 0;

  steps.push({
    array: [...cq], comparing: [], sorted: [], action: 'compare',
    description: `Initialized Circular Queue of capacity ${CAPACITY}.`,
  });

  const enqueue = (val) => {
    if (count === CAPACITY) {
      steps.push({ array: [...cq], comparing: [], sorted: [], action: 'compare', description: `Queue is FULL! Cannot enqueue ${val}.` });
      return;
    }
    if (front === -1) front = 0;
    rear = (rear + 1) % CAPACITY;
    cq[rear] = val;
    count++;
    
    steps.push({
      array: [...cq], comparing: [rear], sorted: [front], action: 'swap',
      description: `Enqueued ${val} at rear index ${rear}. Front is at ${front}.`,
    });
  };

  const dequeue = (valToFind) => {
    if (count === 0) {
      steps.push({ array: [...cq], comparing: [], sorted: [], action: 'compare', description: `Queue is EMPTY! Cannot dequeue.` });
      return;
    }

    valToFind = valToFind !== undefined ? Number(valToFind) : null;
    let foundIdx = -1;

    if (valToFind !== null) {
      let curr = front;
      for (let i = 0; i < count; i++) {
        if (cq[curr] === valToFind) {
          foundIdx = curr;
          break;
        }
        curr = (curr + 1) % CAPACITY;
      }
    } else {
      foundIdx = front;
    }

    if (valToFind !== null && foundIdx === -1) {
      steps.push({ array: [...cq], comparing: [], sorted: [], action: 'compare', description: `Attempted to Dequeue(${valToFind}), but value does not exist!` });
      return;
    }

    const val = cq[foundIdx];
    
    steps.push({
      array: [...cq], comparing: [foundIdx], sorted: [front], action: 'compare',
      description: `Preparing to Dequeue() value ${val} from index ${foundIdx}.`,
    });

    if (foundIdx === front) {
      cq[front] = '-';
      if (front === rear) {
        front = -1;
        rear = -1;
      } else {
        front = (front + 1) % CAPACITY;
      }
    } else {
      let curr = foundIdx;
      while (curr !== rear) {
        let next = (curr + 1) % CAPACITY;
        cq[curr] = cq[next];
        curr = next;
      }
      cq[rear] = '-';
      rear = (rear - 1 + CAPACITY) % CAPACITY;
    }
    count--;

    steps.push({
      array: [...cq], comparing: [], sorted: front !== -1 ? [front] : [], action: 'swap',
      description: `Dequeued ${val}. Remaining size: ${count}.`,
    });
  };

  // Run ops
  for (const op of ops) {
    if (op.type === 'enqueue') enqueue(op.val);
    else if (op.type === 'dequeue') dequeue(op.val);
  }

  steps.push({
    array: [...cq], comparing: [], sorted: [], action: 'done',
    description: `Circular Queue operations complete. Count = ${count}.`,
  });

  return steps;
}

export const circularQueueMeta = {
  algoDescription: `A Circular Queue is a linear data structure where the last position is connected back to the first position to make a circle. It overcomes the limitation of unutilized space in a standard queue. Applications: Memory management, traffic system coordination, and CPU scheduling.`,
  name: 'Circular Queue',
  slug: 'circular-queue',
  category: 'data-structures',
  complexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(n)',
  },
  code: {
    javascript: `class CircularQueue {
  constructor(k) {
    this.q = new Array(k);
    this.head = -1; this.tail = -1; this.size = k;
  }
  enQueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.head = 0;
    this.tail = (this.tail + 1) % this.size;
    this.q[this.tail] = value;
    return true;
  }
  deQueue() {
    if (this.isEmpty()) return false;
    if (this.head === this.tail) { this.head = -1; this.tail = -1; }
    else this.head = (this.head + 1) % this.size;
    return true;
  }
}`,
    python: `class CircularQueue:
    def __init__(self, k: int):
        self.q = [None] * k
        self.head = self.tail = -1
        self.size = k`,
    cpp: `class CircularQueue {
    vector<int> q;
    int head = -1, tail = -1, size;
public:
    CircularQueue(int k) { q.resize(k); size = k; }
};`,
    java: `class CircularQueue {
    int[] queue;
    int front = -1, rear = -1, size;
    public void enQueue(int value) {
        if (isFull()) return;
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        queue[rear] = value;
    }
}`,
  },
  pseudocode: `ENQUEUE(CQ, x)
  if (tail + 1) % N == head
    error "Queue Full"
  tail = (tail + 1) % N
  CQ[tail] = x
  if head == -1 then head = 0`,
};
