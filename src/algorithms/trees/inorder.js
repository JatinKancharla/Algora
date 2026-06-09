/**
 * In-Order Traversal visualization.
 * Builds a BST from input array, then traverses in Left-Node-Right order.
 * Shows the traversal order step by step.
 */
export function inorderTraversal(arr) {
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
    description: `BST built from array. Starting In-Order traversal (Left → Node → Right).`,
    treeData: rootSnapshot
  });

  const visited = [];

  function inorder(node) {
    if (!node) return;

    // Going left
    if (node.left) {
      steps.push({
        array: [...a],
        comparing: [node.idx],
        sorted: [...visited],
        action: 'compare',
        description: `At node ${node.val} (idx ${node.idx}): going left to ${node.left.val}.`,
        treeData: rootSnapshot
      });
    }

    inorder(node.left);

    // Visit current node
    visited.push(node.idx);
    steps.push({
      array: [...a],
      comparing: [node.idx],
      sorted: [...visited],
      action: 'swap',
      description: `Visited node ${node.val} (idx ${node.idx}). In-order so far: [${visited.map(i => a[i]).join(', ')}].`,
      treeData: rootSnapshot
    });

    // Going right
    if (node.right) {
      steps.push({
        array: [...a],
        comparing: [node.idx],
        sorted: [...visited],
        action: 'compare',
        description: `At node ${node.val} (idx ${node.idx}): going right to ${node.right.val}.`,
        treeData: rootSnapshot
      });
    }

    inorder(node.right);
  }

  inorder(root);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...visited],
    action: 'done',
    description: `In-Order traversal complete! Result: [${visited.map(i => a[i]).join(', ')}].`,
    treeData: rootSnapshot
  });

  return steps;
}

export const inorderMeta = {
  algoDescription: `In-order Traversal is a depth-first algorithm that visits the left subtree, the root node, and then the right subtree. Applications: For a Binary Search Tree (BST), in-order traversal retrieves the keys in ascending sorted order.`,
  name: 'In-Order',
  slug: 'inorder',
  category: 'trees',
  complexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(h)',
  },
  code: {
    javascript: `function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}`,
    python: `def inorder(root, result=None):
    if result is None:
        result = []
    if not root:
        return result
    inorder(root.left, result)
    result.append(root.val)
    inorder(root.right, result)
    return result`,
    cpp: `void inorder(Node* root, vector<int>& result) {
    if (!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}`,
    java: `class Inorder {
    void printInorder(Node node) {
        if (node == null) return;
        printInorder(node.left);
        System.out.print(node.key + " ");
        printInorder(node.right);
    }
}`,
  },
  pseudocode: `INORDER(root)
  if root is null
    return
  INORDER(root.left)
  visit root
  INORDER(root.right)`,
};
