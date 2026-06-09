/**
 * Dynamic Array visualization.
 * Appends all elements, simulating capacity resizing (doubling).
 */
export function dynamicArrayVis(payload) {
  const steps = [];
  
  let initialCapacity = 2;
  let ops = [];

  if (Array.isArray(payload)) {
    initialCapacity = 2;
    ops = payload.map(v => ({ type: 'insert', val: v }));
  } else if (payload && typeof payload === 'object') {
    initialCapacity = payload.size || 2;
    ops = payload.ops || [];
  }

  if (ops.length === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty operations list.' });
    return steps;
  }

  let capacity = initialCapacity;
  let dArray = new Array(capacity).fill('-');
  let size = 0;

  steps.push({
    array: [...dArray], comparing: [], sorted: [], action: 'compare',
    description: `Initialized Dynamic Array with capacity = ${capacity}, size = 0.`,
  });

  for (const op of ops) {
    if (op.type === 'insert') {
      if (size === capacity) {
        steps.push({
          array: [...dArray], comparing: [], sorted: [], action: 'compare',
          description: `Array is full (size ${size} == capacity ${capacity}). Needs resizing!`,
        });
        
        capacity *= 2;
        const newArr = new Array(capacity).fill('-');
        for (let j = 0; j < size; j++) newArr[j] = dArray[j];
        dArray = newArr;
        
        steps.push({
          array: [...dArray], comparing: [], sorted: [], action: 'swap',
          description: `Resized! New capacity = ${capacity}. Elements copied over.`,
        });
      }

      dArray[size] = op.val;
      steps.push({
        array: [...dArray], comparing: [size], sorted: [], action: 'swap',
        description: `Appended ${op.val} at index ${size}. Size is now ${size + 1}.`,
      });
      size++;
    } else if (op.type === 'delete') {
      if (size === 0) {
        steps.push({
          array: [...dArray], comparing: [], sorted: [], action: 'compare',
          description: `Attempted to Delete(), but array is empty!`,
        });
      } else {
        const valToFind = op.val !== undefined ? Number(op.val) : null;
        let foundIdx = size - 1;

        if (valToFind !== null) {
          foundIdx = dArray.slice(0, size).indexOf(valToFind);
        }

        if (valToFind !== null && foundIdx === -1) {
          steps.push({
            array: [...dArray], comparing: [], sorted: [], action: 'compare',
            description: `Attempted to Delete(${valToFind}), but value does not exist!`,
          });
        } else {
          const removed = dArray[foundIdx];
          steps.push({
            array: [...dArray], comparing: [foundIdx], sorted: [], action: 'compare',
            description: `Preparing to Delete() value ${removed} from index ${foundIdx}.`,
          });

          for (let j = foundIdx; j < size - 1; j++) {
            dArray[j] = dArray[j + 1];
          }
          dArray[size - 1] = '-';
          size--;

          steps.push({
            array: [...dArray], comparing: [], sorted: [], action: 'swap',
            description: `Deleted ${removed}. Elements shifted. Size is now ${size}.`,
          });
        }
      }
    }
  }

  steps.push({
    array: [...dArray], comparing: [], sorted: Array.from({ length: size }, (_, i) => i), action: 'done',
    description: `Dynamic Array operations complete. Final size = ${size}, capacity = ${capacity}.`,
  });

  return steps;
}

export const dynamicArrayMeta = {
  algoDescription: `A Dynamic Array (or arraylist) is a random access, variable-size list data structure that allows elements to be added or removed. It resizes itself automatically when it gets full. Applications: Implementing lists in programming languages (like Python's list or Java's ArrayList), and maintaining dynamic collections of elements.`,
  name: 'Dynamic Array',
  slug: 'dynamic-array',
  category: 'data-structures',
  complexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(n) append, O(1) amortized',
    space: 'O(n)',
  },
  code: {
    javascript: `class DynamicArray {
  constructor() {
    this.capacity = 2;
    this.size = 0;
    this.arr = new Array(this.capacity);
  }
  push(val) {
    if (this.size === this.capacity) {
      this.capacity *= 2;
      const newArr = new Array(this.capacity);
      for(let i=0; i<this.size; i++) newArr[i] = this.arr[i];
      this.arr = newArr;
    }
    this.arr[this.size++] = val;
  }
}`,
    python: `import ctypes
class DynamicArray:
    def __init__(self):
        self.size = 0
        self.capacity = 2
        self.arr = self.make_array(self.capacity)
    def push(self, val):
        if self.size == self.capacity:
            self._resize(2 * self.capacity)
        self.arr[self.size] = val
        self.size += 1`,
    cpp: `#include <vector>
vector<int> v;
v.push_back(10); // Automatically resizes underlying array`,
    java: `class DynamicArray {
    int[] array;
    int size;
    int capacity;
    public void add(int element) {
        if (size == capacity) {
            // resize array
        }
        array[size++] = element;
    }
}`,
  },
  pseudocode: `APPEND(A, x)
  if A.size == A.capacity
    allocate new_A with size 2 * A.capacity
    copy A to new_A
    A = new_A
  A[A.size] = x
  A.size = A.size + 1`,
};
