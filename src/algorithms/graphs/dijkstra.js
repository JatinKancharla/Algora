/**
 * Dijkstra's shortest path visualization.
 * Builds a weighted graph from the input array (binary tree adjacency with edge weights = node values).
 * Finds shortest distances from node 0 to all others.
 */
export function dijkstra(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  if (n === 0) {
    steps.push({ array: [], comparing: [], sorted: [], action: 'done', description: 'Empty array — nothing to process.' });
    return steps;
  }

  // Build weighted adjacency: edge weight = destination node's value
  const adj = {};
  for (let i = 0; i < n; i++) {
    adj[i] = [];
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) adj[i].push({ node: left, weight: a[left] });
    if (right < n) adj[i].push({ node: right, weight: a[right] });
    // Bidirectional
    if (left < n) {
      if (!adj[left]) adj[left] = [];
      adj[left].push({ node: i, weight: a[i] });
    }
    if (right < n) {
      if (!adj[right]) adj[right] = [];
      adj[right].push({ node: i, weight: a[i] });
    }
  }

  const dist = new Array(n).fill(Infinity);
  const visited = new Set();
  const processed = [];
  dist[0] = 0;

  steps.push({
    array: [...a],
    comparing: [0],
    sorted: [],
    action: 'compare',
    description: `Starting Dijkstra from node 0 (value ${a[0]}). Initial distance to node 0 = 0, all others = Infinity.`,
  });

  for (let iter = 0; iter < n; iter++) {
    // Find unvisited node with minimum distance
    let u = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && dist[i] < minDist) {
        minDist = dist[i];
        u = i;
      }
    }

    if (u === -1) break;

    visited.add(u);
    processed.push(u);

    steps.push({
      array: [...a],
      comparing: [u],
      sorted: [...processed],
      action: 'swap',
      description: `Processing node ${u} (value ${a[u]}) with distance ${dist[u]}. Distances: [${dist.map((d, i) => `${i}:${d === Infinity ? '∞' : d}`).join(', ')}].`,
    });

    // Relax edges
    for (const edge of (adj[u] || [])) {
      if (!visited.has(edge.node)) {
        const newDist = dist[u] + edge.weight;
        if (newDist < dist[edge.node]) {
          dist[edge.node] = newDist;
          steps.push({
            array: [...a],
            comparing: [u, edge.node],
            sorted: [...processed],
            action: 'compare',
            description: `Relaxed edge ${u} → ${edge.node}: distance updated from ${dist[edge.node] === newDist ? (newDist + edge.weight) : '∞'} to ${newDist} (via node ${u}, weight ${edge.weight}).`,
          });
        }
      }
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    sorted: [...processed],
    action: 'done',
    description: `Dijkstra complete! Shortest distances from node 0: [${dist.map((d, i) => `${i}:${d === Infinity ? '∞' : d}`).join(', ')}].`,
  });

  return steps;
}

export const dijkstraMeta = {
  algoDescription: `Dijkstra's Algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. Applications: GPS navigation systems, network routing protocols (like OSPF), and telecommunication networks.`,
  name: 'Dijkstra',
  slug: 'dijkstra',
  category: 'graphs',
  complexity: {
    best: 'O(V²)',
    average: 'O(V²)',
    worst: 'O(V²)',
    space: 'O(V)',
  },
  code: {
    javascript: `function dijkstra(graph, start) {
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Set();
  dist[start] = 0;
  for (let i = 0; i < n; i++) {
    let u = -1, minDist = Infinity;
    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && dist[j] < minDist) {
        minDist = dist[j]; u = j;
      }
    }
    if (u === -1) break;
    visited.add(u);
    for (const {node, weight} of graph[u]) {
      if (dist[u] + weight < dist[node])
        dist[node] = dist[u] + weight;
    }
  }
  return dist;
}`,
    python: `import heapq

def dijkstra(graph, start):
    n = len(graph)
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    cpp: `vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>,
                   greater<>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    java: `class Dijkstra {
    void dijkstra(int graph[][], int src) {
        int dist[] = new int[V];
        Boolean sptSet[] = new Boolean[V];
        // Initialization and shortest path logic
    }
}`,
  },
  pseudocode: `DIJKSTRA(G, start)
  dist[start] = 0, dist[*] = INF
  while unvisited nodes remain
    u = unvisited node with min dist
    mark u as visited
    for each neighbor v of u
      if dist[u] + weight(u,v) < dist[v]
        dist[v] = dist[u] + weight(u,v)`,
};
