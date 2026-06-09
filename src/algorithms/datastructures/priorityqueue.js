/**
 * Priority Queue (Min Heap) visualization.
 * Inserts all elements, bubbling them up, then extracts minimum elements.
 */
export function priorityQueueVis(payload) {
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

  const heap = [];

  for (const op of ops) {
    if (op.type === 'enqueue') {
      if (heap.length >= size) {
        steps.push({
          array: [...heap],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Insert(${op.val}), but Heap Overflow occurred! (Capacity: ${size})`,
        });
        continue;
      }

      const val = op.val;
      heap.push(val);
      let curr = heap.length - 1;
      
      steps.push({
        array: [...heap],
        comparing: [curr],
        sorted: [],
        action: 'swap',
        description: `Insert(${val}) at end of heap.`,
      });

      // Bubble up
      while (curr > 0) {
        const parent = Math.floor((curr - 1) / 2);
        steps.push({
          array: [...heap],
          comparing: [curr, parent],
          sorted: [],
          action: 'compare',
          description: `Comparing ${heap[curr]} with parent ${heap[parent]}.`,
        });

        if (heap[curr] >= heap[parent]) break;

        [heap[curr], heap[parent]] = [heap[parent], heap[curr]];
        steps.push({
          array: [...heap],
          comparing: [curr, parent],
          sorted: [],
          action: 'swap',
          description: `Swapped ${heap[curr]} and ${heap[parent]} (bubbling up).`,
        });
        curr = parent;
      }
    } else if (op.type === 'dequeue') {
      if (heap.length === 0) {
        steps.push({
          array: [...heap],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Extract Min(), but Heap Underflow occurred! (Empty)`,
        });
        continue;
      }

      const valToFind = op.val !== undefined ? Number(op.val) : null;
      let foundIdx = 0;

      if (valToFind !== null) {
        foundIdx = heap.indexOf(valToFind);
      }

      if (valToFind !== null && foundIdx === -1) {
        steps.push({
          array: [...heap],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Extract(${valToFind}), but value does not exist!`,
        });
        continue;
      }

      if (heap.length === 1 && foundIdx === 0) {
        const min = heap.pop();
        steps.push({
          array: [...heap],
          comparing: [],
          sorted: [],
          action: 'swap',
          description: `Extracted last element ${min}.`,
        });
        continue;
      }

      const val = heap[foundIdx];
      const last = heap.pop();
      
      if (foundIdx < heap.length) {
        heap[foundIdx] = last;

        steps.push({
          array: [...heap],
          comparing: [foundIdx],
          sorted: [],
          action: 'swap',
          description: `Extracted (${val}). Moved last element (${last}) to index ${foundIdx}.`,
        });

        let curr = foundIdx;
        const parent = Math.floor((curr - 1) / 2);

        if (curr > 0 && heap[curr] < heap[parent]) {
          // Bubble up
          while (curr > 0) {
            const p = Math.floor((curr - 1) / 2);
            steps.push({ array: [...heap], comparing: [curr, p], sorted: [], action: 'compare', description: `Comparing ${heap[curr]} with parent ${heap[p]}.` });
            if (heap[curr] >= heap[p]) break;
            [heap[curr], heap[p]] = [heap[p], heap[curr]];
            steps.push({ array: [...heap], comparing: [curr, p], sorted: [], action: 'swap', description: `Swapped to bubble up.` });
            curr = p;
          }
        } else {
          // Bubble down
          while (true) {
            let left = 2 * curr + 1;
            let right = 2 * curr + 2;
            let smallest = curr;

            if (left < heap.length) {
              steps.push({ array: [...heap], comparing: [curr, left], sorted: [], action: 'compare', description: `Checking left child.` });
              if (heap[left] < heap[smallest]) smallest = left;
            }
            if (right < heap.length) {
              steps.push({ array: [...heap], comparing: [curr, right], sorted: [], action: 'compare', description: `Checking right child.` });
              if (heap[right] < heap[smallest]) smallest = right;
            }

            if (smallest === curr) break;

            [heap[curr], heap[smallest]] = [heap[smallest], heap[curr]];
            steps.push({
              array: [...heap],
              comparing: [curr, smallest],
              sorted: [],
              action: 'swap',
              description: `Swapped to bubble down.`,
            });
            curr = smallest;
          }
        }
      } else {
        steps.push({
          array: [...heap],
          comparing: [],
          sorted: [],
          action: 'swap',
          description: `Extracted the last element (${val}).`,
        });
      }
    }
  }

  steps.push({
    array: [...heap],
    comparing: [],
    sorted: Array.from({ length: heap.length }, (_, i) => i),
    action: 'done',
    description: `Priority Queue operations complete.`,
  });

  return steps;
}

export const priorityQueueMeta = {
  algoDescription: `A Priority Queue is an abstract data type similar to a regular queue or stack, but where additionally each element has a "priority" associated with it. Elements with higher priority are served before those with lower priority. Applications: CPU scheduling, Dijkstra's shortest path algorithm, and A* search algorithm.`,
  name: 'Priority Queue',
  slug: 'priority-queue',
  category: 'data-structures',
  complexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(n)',
  },
  code: {
    javascript: `// Usually implemented with a Min/Max Heap array
function insert(heap, val) {
  heap.push(val);
  bubbleUp(heap, heap.length - 1);
}
function extractMin(heap) {
  const min = heap[0];
  heap[0] = heap.pop();
  bubbleDown(heap, 0);
  return min;
}`,
    python: `import heapq
pq = []
heapq.heappush(pq, 10)
min_val = heapq.heappop(pq)`,
    cpp: `#include <queue>
priority_queue<int, vector<int>, greater<int>> pq;
pq.push(10);
int min = pq.top();
pq.pop();`,
    java: `class PriorityQueueImpl {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    public void insert(int val) { pq.add(val); }
    public int extractMin() { return pq.poll(); }
}`,
  },
  pseudocode: `PQ INSERT(H, x)
  H.size = H.size + 1
  H[H.size] = x
  BUBBLE-UP(H, H.size)

PQ EXTRACT-MIN(H)
  min = H[1]
  H[1] = H[H.size]
  H.size = H.size - 1
  BUBBLE-DOWN(H, 1)
  return min`,
};
