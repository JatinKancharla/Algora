/**
 * DFS visualization using the input array as node values.
 * Builds a simple graph where node i connects to nodes i*2+1 and i*2+2 (binary tree adjacency).
 * Traverses using DFS (pre-order depth-first) and shows the visit order step by step.
 */
export function dfs(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  if (n === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty array — nothing to traverse.' });
    return steps;
  }

  // Build adjacency from binary-tree-style indexing
  const adj = {};
  for (let i = 0; i < n; i++) {
    adj[i] = [];
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) adj[i].push(left);
    if (right < n) adj[i].push(right);
  }

  const visited = new Set();
  const visitedOrder = [];
  const stack = [0];

  steps.push({
    array: [...a],
    comparing: [0],
    sorted: [],
    action: 'compare',
    description: `Starting DFS from node 0 (value ${a[0]}). Stack: [0].`,
  });

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    visitedOrder.push(node);

    steps.push({
      array: [...a],
      comparing: [node],
      sorted: [...visitedOrder],
      action: 'swap',
      description: `Visited node ${node} (value ${a[node]}). Visited so far: [${visitedOrder.map(i => a[i]).join(', ')}].`,
    });

    // Push right first so left is processed first (LIFO)
    const neighbors = [...(adj[node] || [])].reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        steps.push({
          array: [...a],
          comparing: [neighbor],
          sorted: [...visitedOrder],
          action: 'compare',
          description: `Pushing node ${neighbor} (value ${a[neighbor]}) to stack. Stack: [${stack.join(', ')}].`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...visitedOrder],
    action: 'done',
    description: `DFS complete! Visit order: [${visitedOrder.map(i => a[i]).join(', ')}].`,
  });

  return steps;
}

export const dfsMeta = {
  algoDescription: `Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. Applications: Topological sorting, finding connected components, solving puzzles (like mazes), and cycle detection.`,
  name: 'DFS',
  slug: 'dfs',
  category: 'graphs',
  complexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
  },
  code: {
    javascript: `function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node].reverse()) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  return result;
}`,
    python: `def dfs(graph, start):
    visited = set()
    stack = [start]
    result = []
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        result.append(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    return result`,
    cpp: `void dfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    stack<int> s;
    s.push(start);
    while (!s.empty()) {
        int node = s.top(); s.pop();
        if (visited[node]) continue;
        visited[node] = true;
        for (int i = graph[node].size()-1; i >= 0; i--) {
            if (!visited[graph[node][i]])
                s.push(graph[node][i]);
        }
    }
}`,
    java: `class DFS {
    void DFSUtil(int v, boolean visited[]) {
        visited[v] = true;
        Iterator<Integer> i = adj[v].listIterator();
        while (i.hasNext()) {
            int n = i.next();
            if (!visited[n]) DFSUtil(n, visited);
        }
    }
}`,
  },
  pseudocode: `DFS(G, start)
  create stack S
  S.push(start)
  while S is not empty
    v = S.pop()
    if v is not visited
      mark v as visited
      for each neighbor u of v (reversed)
        if u is not visited
          S.push(u)`,
};
