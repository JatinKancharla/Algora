/**
 * Stack visualization.
 * Pushes all elements from the array into the stack, then pops half of them.
 */
export function stackVis(payload) {
  const steps = [];
  
  let size = 5;
  let ops = [];

  if (Array.isArray(payload)) {
    size = Math.max(5, payload.length);
    ops = payload.map(v => ({ type: 'push', val: v }));
    for (let i = 0; i < payload.length / 2; i++) ops.push({ type: 'pop' });
  } else if (payload && typeof payload === 'object') {
    size = payload.size || 5;
    ops = payload.ops || [];
  }

  if (ops.length === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty operations list.' });
    return steps;
  }

  const stack = [];

  for (const op of ops) {
    if (op.type === 'push') {
      if (stack.length >= size) {
        steps.push({
          array: [...stack],
          comparing: [],
          sorted: [],
          action: 'compare', // highlights as cyan to indicate attempted action
          description: `Attempted to Push(${op.val}), but Stack Overflow occurred! (Capacity: ${size})`,
        });
      } else {
        stack.push(op.val);
        steps.push({
          array: [...stack],
          comparing: [stack.length - 1],
          sorted: [],
          action: 'swap',
          description: `Push(${op.val}) onto the stack. Top is now index ${stack.length - 1}.`,
        });
      }
    } else if (op.type === 'pop') {
      if (stack.length === 0) {
        steps.push({
          array: [...stack],
          comparing: [],
          sorted: [],
          action: 'compare',
          description: `Attempted to Pop(), but Stack Underflow occurred! (Stack is empty)`,
        });
      } else {
        const valToFind = op.val !== undefined ? Number(op.val) : null;
        let foundIdx = stack.length - 1;

        if (valToFind !== null) {
          foundIdx = stack.lastIndexOf(valToFind);
        }

        if (valToFind !== null && foundIdx === -1) {
          steps.push({
            array: [...stack],
            comparing: [],
            sorted: [],
            action: 'compare',
            description: `Attempted to Pop(${valToFind}), but value does not exist!`,
          });
        } else {
          steps.push({
            array: [...stack],
            comparing: [foundIdx],
            sorted: [],
            action: 'compare',
            description: `Preparing to Pop() value ${stack[foundIdx]}.`,
          });
          const popped = stack[foundIdx];
          stack.splice(foundIdx, 1);
          steps.push({
            array: [...stack],
            comparing: [],
            sorted: [],
            action: 'swap',
            description: `Popped ${popped}. Stack size is now ${stack.length}.`,
          });
        }
      }
    }
  }

  steps.push({
    array: [...stack],
    comparing: [],
    sorted: Array.from({ length: stack.length }, (_, i) => i),
    action: 'done',
    description: `Stack operations complete. Remaining elements: ${stack.length}.`,
  });

  return steps;
}

export const stackMeta = {
  algoDescription: `A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top. Applications: Function call management (call stack) in programming, undo mechanisms in text editors, and syntax parsing/evaluating expressions.`,
  name: 'Stack',
  slug: 'stack',
  category: 'data-structures',
  complexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
    space: 'O(n)',
  },
  code: {
    javascript: `class Stack {
  constructor() { this.items = []; }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}`,
    python: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        return self.items.pop()
    def peek(self):
        return self.items[-1]`,
    cpp: `#include <stack>
stack<int> s;
s.push(10);
int top = s.top();
s.pop();`,
    java: `class Stack {
    static final int MAX = 1000;
    int top;
    int a[] = new int[MAX];
    boolean push(int x) {
        if (top >= (MAX - 1)) return false;
        else { a[++top] = x; return true; }
    }
    int pop() {
        if (top < 0) return 0;
        else { return a[top--]; }
    }
}`,
  },
  pseudocode: `STACK
PUSH(S, x)
  S.top = S.top + 1
  S[S.top] = x

POP(S)
  if S.top == 0
    error "underflow"
  else
    S.top = S.top - 1
    return S[S.top + 1]`,
};
