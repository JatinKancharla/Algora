/**
 * Pre-Order Traversal visualization.
 * Builds a BST from input array, then traverses in Node-Left-Right order.
 * Shows the traversal order step by step.
 */
export function preorderTraversal(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  if (n === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty array — nothing to traverse.' });
    return steps;
  }

  // Build BST
  class Node {
    constructor(val, idx) { this.val = val; this.idx = idx; this.left = null; this.right = null; }
  }

  function insert(node, val, idx) {
    if (!node) return new Node(val, idx);
    if (val < node.val) node.left = insert(node.left, val, idx);
    else node.right = insert(node.right, val, idx);
    return node;
  }

  function snapshotTree(node) {
    if (!node) return null;
    return { id: node.idx, val: node.val, left: snapshotTree(node.left), right: snapshotTree(node.right) };
  }

  let root = null;
  for (let i = 0; i < n; i++) root = insert(root, a[i], i);

  const rootSnapshot = snapshotTree(root);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [],
    action: 'compare',
    description: `BST built from array. Starting Pre-Order traversal (Node → Left → Right).`,
    treeData: rootSnapshot
  });

  const visited = [];

  function preorder(node) {
    if (!node) return;

    // Visit current node first
    visited.push(node.idx);
    steps.push({
      array: [...a],
      comparing: [node.idx],
      sorted: [...visited],
      action: 'swap',
      description: `Visited node ${node.val} (idx ${node.idx}). Pre-order so far: [${visited.map(i => a[i]).join(', ')}].`,
      treeData: rootSnapshot
    });

    // Going left
    if (node.left) {
      steps.push({
        array: [...a],
        comparing: [node.left.idx],
        sorted: [...visited],
        action: 'compare',
        description: `Going left from ${node.val} to ${node.left.val}.`,
        treeData: rootSnapshot
      });
    }
    preorder(node.left);

    // Going right
    if (node.right) {
      steps.push({
        array: [...a],
        comparing: [node.right.idx],
        sorted: [...visited],
        action: 'compare',
        description: `Going right from ${node.val} to ${node.right.val}.`,
        treeData: rootSnapshot
      });
    }
    preorder(node.right);
  }

  preorder(root);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...visited],
    action: 'done',
    description: `Pre-Order traversal complete! Result: [${visited.map(i => a[i]).join(', ')}].`,
    treeData: rootSnapshot
  });

  return steps;
}

export const preorderMeta = {
  algoDescription: `Pre-order Traversal is a depth-first algorithm that visits the root node, then the left subtree, and finally the right subtree. Applications: Used to create a copy of the tree. Also used to get prefix expression of an expression tree.`,
  name: 'Pre-Order',
  slug: 'preorder',
  category: 'trees',
  complexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(h)',
  },
  code: {
    javascript: `function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}`,
    python: `def preorder(root, result=None):
    if result is None:
        result = []
    if not root:
        return result
    result.append(root.val)
    preorder(root.left, result)
    preorder(root.right, result)
    return result`,
    cpp: `void preorder(Node* root, vector<int>& result) {
    if (!root) return;
    result.push_back(root->val);
    preorder(root->left, result);
    preorder(root->right, result);
}`,
    java: `class Preorder {
    void printPreorder(Node node) {
        if (node == null) return;
        System.out.print(node.key + " ");
        printPreorder(node.left);
        printPreorder(node.right);
    }
}`,
  },
  pseudocode: `PREORDER(root)
  if root is null
    return
  visit root
  PREORDER(root.left)
  PREORDER(root.right)`,
};
