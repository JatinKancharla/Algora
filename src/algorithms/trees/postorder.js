/**
 * Post-Order Traversal visualization.
 * Builds a BST from input array, then traverses in Left-Right-Node order.
 * Shows the traversal order step by step.
 */
export function postorderTraversal(arr) {
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
    description: `BST built from array. Starting Post-Order traversal (Left → Right → Node).`,
    treeData: rootSnapshot
  });

  const visited = [];

  function postorder(node) {
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
    postorder(node.left);

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
    postorder(node.right);

    // Visit current node
    visited.push(node.idx);
    steps.push({
      array: [...a],
      comparing: [node.idx],
      sorted: [...visited],
      action: 'swap',
      description: `Visited node ${node.val} (idx ${node.idx}). Post-order so far: [${visited.map(i => a[i]).join(', ')}].`,
      treeData: rootSnapshot
    });
  }

  postorder(root);

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...visited],
    action: 'done',
    description: `Post-Order traversal complete! Result: [${visited.map(i => a[i]).join(', ')}].`,
    treeData: rootSnapshot
  });

  return steps;
}

export const postorderMeta = {
  algoDescription: `Post-order Traversal is a depth-first algorithm that visits the left subtree, then the right subtree, and finally the root node. Applications: Used to delete the tree, as it ensures child nodes are deleted before parent nodes. Also used to get the postfix expression of an expression tree.`,
  name: 'Post-Order',
  slug: 'postorder',
  category: 'trees',
  complexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(h)',
  },
  code: {
    javascript: `function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}`,
    python: `def postorder(root, result=None):
    if result is None:
        result = []
    if not root:
        return result
    postorder(root.left, result)
    postorder(root.right, result)
    result.append(root.val)
    return result`,
    cpp: `void postorder(Node* root, vector<int>& result) {
    if (!root) return;
    postorder(root->left, result);
    postorder(root->right, result);
    result.push_back(root->val);
}`,
    java: `class Postorder {
    void printPostorder(Node node) {
        if (node == null) return;
        printPostorder(node.left);
        printPostorder(node.right);
        System.out.print(node.key + " ");
    }
}`,
  },
  pseudocode: `POSTORDER(root)
  if root is null
    return
  POSTORDER(root.left)
  POSTORDER(root.right)
  visit root`,
};
