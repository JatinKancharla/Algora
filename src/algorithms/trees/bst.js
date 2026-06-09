/**
 * BST Insertion visualization.
 * Takes array values and inserts them one by one into a BST.
 * The bar chart shows the current state of input values,
 * highlighting comparisons made during each insertion.
 */
export function bstInsert(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  if (n === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty array — nothing to insert.' });
    return steps;
  }

  // BST node structure
  class Node {
    constructor(val, idx) { this.val = val; this.idx = idx; this.left = null; this.right = null; }
  }

  function snapshotTree(node) {
    if (!node) return null;
    return { id: node.idx, val: node.val, left: snapshotTree(node.left), right: snapshotTree(node.right) };
  }

  const inserted = [];
  let root = null;

  function insert(node, val, idx) {
    if (!node) {
      inserted.push(idx);
      const newNode = new Node(val, idx);
      // Wait, we need to push step AFTER the node is actually attached, but since we are recursing, 
      // the parent's pointer isn't updated until we return.
      // We will just return it, and let the caller update, then push step!
      return newNode;
    }

    steps.push({
      array: [...a], comparing: [idx, node.idx], sorted: [...inserted], action: 'compare',
      description: `Comparing ${val} with node ${node.val}: ${val < node.val ? 'go left' : 'go right'}.`,
      treeData: snapshotTree(root)
    });

    if (val < node.val) {
      node.left = insert(node.left, val, idx);
    } else {
      node.right = insert(node.right, val, idx);
    }
    return node;
  }

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...a], comparing: [i], sorted: [...inserted], action: 'compare',
      description: `Inserting value ${a[i]} (index ${i}) into BST...`,
      treeData: snapshotTree(root)
    });
    root = insert(root, a[i], i);
    // Push step after insertion completes for this node
    steps.push({
      array: [...a], comparing: [i], sorted: [...inserted], action: 'swap',
      description: `Inserted ${a[i]} into BST.`,
      treeData: snapshotTree(root)
    });
  }

  steps.push({
    array: [...a], comparing: [], sorted: Array.from({ length: n }, (_, i) => i), action: 'done',
    description: `BST construction complete! All ${n} values inserted.`,
    treeData: snapshotTree(root)
  });

  return steps;
}

export const bstInsertMeta = {
  algoDescription: `A Binary Search Tree is a node-based binary tree data structure where each node has at most two children. The left subtree contains only nodes with keys lesser than the node’s key, and the right subtree contains nodes with greater keys. Applications: Used in many search applications where data is constantly entering/leaving, such as in map and set objects in many languages.`,
  name: 'BST Insert',
  slug: 'bst-insert',
  category: 'trees',
  complexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(n)',
    space: 'O(n)',
  },
  code: {
    javascript: `class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function insert(root, val) {
  if (!root) return new Node(val);
  if (val < root.val)
    root.left = insert(root.left, val);
  else
    root.right = insert(root.right, val);
  return root;
}`,
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root`,
    cpp: `struct Node {
    int val;
    Node *left, *right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}`,
    java: `class BST {
    class Node {
        int key; Node left, right;
        public Node(int item) { key = item; left = right = null; }
    }
    Node root;
    Node insertRec(Node root, int key) {
        if (root == null) { root = new Node(key); return root; }
        if (key < root.key) root.left = insertRec(root.left, key);
        else if (key > root.key) root.right = insertRec(root.right, key);
        return root;
    }
}`,
  },
  pseudocode: `BST-INSERT(root, val)
  if root is null
    return new Node(val)
  if val < root.val
    root.left = BST-INSERT(root.left, val)
  else
    root.right = BST-INSERT(root.right, val)
  return root`,
};
