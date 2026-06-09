/**
 * BFS visualization using the input array as node values.
 * Builds a simple graph where node i connects to nodes i*2+1 and i*2+2 (binary tree adjacency).
 * Traverses using BFS (level-order) and shows the visit order step by step.
 */
export function bfs(arr) {
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
  const queue = [0];
  const visitedOrder = [];

  steps.push({
    array: [...a],
    comparing: [0],
    sorted: [],
    action: 'compare',
    description: `Starting BFS from node 0 (value ${a[0]}). Queue: [0].`,
  });

  while (queue.length > 0) {
    const node = queue.shift();
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

    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        steps.push({
          array: [...a],
          comparing: [neighbor],
          sorted: [...visitedOrder],
          action: 'compare',
          description: `Adding neighbor node ${neighbor} (value ${a[neighbor]}) to queue. Queue: [${queue.map(i => i).join(', ')}].`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...visitedOrder],
    action: 'done',
    description: `BFS complete! Visit order: [${visitedOrder.map(i => a[i]).join(', ')}].`,
  });

  return steps;
}

export const bfsMeta = {
  algoDescription: `Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Applications: Shortest path in unweighted graphs, web crawlers, and finding peer-to-peer networks.`,
  name: 'BFS',
  slug: 'bfs',
  category: 'graphs',
  complexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
  },
  code: {
    javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    while queue:
        node = queue.popleft()
        if node in visited:
            continue
        visited.add(node)
        result.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append(neighbor)
    return result`,
    cpp: `void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    q.push(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        if (visited[node]) continue;
        visited[node] = true;
        for (int neighbor : graph[node]) {
            if (!visited[neighbor])
                q.push(neighbor);
        }
    }
}`,
    java: `class BFS {
    void BFS(int s) {
        boolean visited[] = new boolean[V];
        LinkedList<Integer> queue = new LinkedList<Integer>();
        visited[s] = true;
        queue.add(s);
        while (queue.size() != 0) {
            s = queue.poll();
            Iterator<Integer> i = adj[s].listIterator();
            while (i.hasNext()) {
                int n = i.next();
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }
}`,
  },
  pseudocode: `BFS(G, start)
  create queue Q
  mark start as visited
  Q.enqueue(start)
  while Q is not empty
    v = Q.dequeue()
    for each neighbor u of v
      if u is not visited
        mark u as visited
        Q.enqueue(u)`,
};
