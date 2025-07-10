export  class PriorityQueue {
  constructor(compareFn = (a, b) => a.priority - b.priority) {
    this.heap = [];
    this.compare = compareFn;
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChild(index) {
    return 2 * index + 1;
  }

  rightChild(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    if (index === 0) return;

    const parentIndex = this.parent(index);
    if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyDown(index) {
    const left = this.leftChild(index);
    const right = this.rightChild(index);
    let smallest = index;

    if (
      left < this.heap.length &&
      this.compare(this.heap[left], this.heap[smallest]) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      this.compare(this.heap[right], this.heap[smallest]) < 0
    ) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  toArray() {
    return [...this.heap];
  }
}

// Directed Acyclic Graph (DAG) Implementation
export class DAG {
  constructor() {
    this.vertices = new Map();
    this.edges = new Map();
  }

  addVertex(id, data) {
    this.vertices.set(id, data);
    if (!this.edges.has(id)) {
      this.edges.set(id, []);
    }
  }

  addEdge(from, to) {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      throw new Error("Both vertices must exist");
    }

    // Check if adding this edge would create a cycle
    if (this.wouldCreateCycle(from, to)) {
      throw new Error(
        "Adding this dependency would create a circular dependency"
      );
    }

    this.edges.get(from).push(to);
  }

  removeEdge(from, to) {
    if (this.edges.has(from)) {
      const edges = this.edges.get(from);
      const index = edges.indexOf(to);
      if (index > -1) {
        edges.splice(index, 1);
      }
    }
  }

  removeVertex(id) {
    this.vertices.delete(id);
    this.edges.delete(id);

    // Remove all edges pointing to this vertex
    for (let [vertex, edges] of this.edges) {
      const index = edges.indexOf(id);
      if (index > -1) {
        edges.splice(index, 1);
      }
    }
  }

  // DFS-based cycle detection
  wouldCreateCycle(from, to) {
    const visited = new Set();
    const recursionStack = new Set();

    // Temporarily add the edge
    const tempEdges = new Map();
    for (let [vertex, edges] of this.edges) {
      tempEdges.set(vertex, [...edges]);
    }
    tempEdges.get(from).push(to);

    const dfs = (vertex) => {
      visited.add(vertex);
      recursionStack.add(vertex);

      const neighbors = tempEdges.get(vertex) || [];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) return true;
        } else if (recursionStack.has(neighbor)) {
          return true;
        }
      }

      recursionStack.delete(vertex);
      return false;
    };

    for (let vertex of this.vertices.keys()) {
      if (!visited.has(vertex)) {
        if (dfs(vertex)) return true;
      }
    }

    return false;
  }

  // Topological Sort using DFS
  topologicalSort() {
    const visited = new Set();
    const result = [];

    const dfs = (vertex) => {
      visited.add(vertex);

      const neighbors = this.edges.get(vertex) || [];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }

      result.unshift(vertex);
    };

    for (let vertex of this.vertices.keys()) {
      if (!visited.has(vertex)) {
        dfs(vertex);
      }
    }

    return result;
  }

  // Get tasks with no dependencies (can be executed immediately)
  getReadyTasks() {
    const hasIncomingEdge = new Set();

    for (let edges of this.edges.values()) {
      for (let to of edges) {
        hasIncomingEdge.add(to);
      }
    }

    const readyTasks = [];
    for (let vertex of this.vertices.keys()) {
      if (!hasIncomingEdge.has(vertex)) {
        readyTasks.push(vertex);
      }
    }

    return readyTasks;
  }

  getDependencies(taskId) {
    const dependencies = [];
    for (let [from, edges] of this.edges) {
      if (edges.includes(taskId)) {
        dependencies.push(from);
      }
    }
    return dependencies;
  }

  getDependents(taskId) {
    return this.edges.get(taskId) || [];
  }
}
