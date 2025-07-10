class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// LRU Cache implementation using doubly linked list and hash map
export class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Hash map for O(1) access

    // Create dummy head and tail nodes for easier manipulation
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;

    // Statistics
    this.hitCount = 0;
    this.missCount = 0;
    this.operations = [];
  }

  // Helper method to add node right after head
  addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  // Helper method to remove an existing node
  removeNode(node) {
    const prevNode = node.prev;
    const nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  // Helper method to move node to head (most recently used)
  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  // Helper method to remove tail node (least recently used)
  popTail() {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }

  // Get value from cache - O(1) time complexity
  get(key) {
    const node = this.cache.get(key);

    if (node) {
      this.moveToHead(node);
      this.hitCount++;
      this.operations.push({
        type: "GET",
        key,
        value: node.value,
        result: "HIT",
      });
      return node.value;
    } else {
      this.missCount++;
      this.operations.push({ type: "GET", key, value: null, result: "MISS" });
      return -1; 
    }
  }

  // Put key-value pair in cache - O(1) time complexity
  put(key, value) {
    const node = this.cache.get(key);

    if (node) {
      // Update existing node
      node.value = value;
      this.moveToHead(node);
      this.operations.push({ type: "PUT", key, value, result: "UPDATE" });
    } else {
      // Create new node
      const newNode = new Node(key, value);

      if (this.cache.size >= this.capacity) {
        // Remove least recently used node
        const tail = this.popTail();
        this.cache.delete(tail.key);
        this.operations.push({
          type: "EVICT",
          key: tail.key,
          value: tail.value,
          result: "REMOVED",
        });
      }

      // Add new node
      this.cache.set(key, newNode);
      this.addNode(newNode);
      this.operations.push({ type: "PUT", key, value, result: "ADD" });
    }
  }

  // Delete key from cache - O(1) time complexity
  delete(key) {
    const node = this.cache.get(key);

    if (node) {
      this.removeNode(node);
      this.cache.delete(key);
      this.operations.push({
        type: "DELETE",
        key,
        value: node.value,
        result: "REMOVED",
      });
      return true;
    }

    this.operations.push({
      type: "DELETE",
      key,
      value: null,
      result: "NOT_FOUND",
    });
    return false;
  }

  // Get all keys in order from most to least recently used
  getKeys() {
    const keys = [];
    let current = this.head.next;

    while (current !== this.tail) {
      keys.push(current.key);
      current = current.next;
    }

    return keys;
  }

  // Get all key-value pairs in order from most to least recently used
  getAll() {
    const items = [];
    let current = this.head.next;

    while (current !== this.tail) {
      items.push({ key: current.key, value: current.value });
      current = current.next;
    }

    return items;
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      capacity: this.capacity,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate:
        this.hitCount + this.missCount > 0
          ? ((this.hitCount / (this.hitCount + this.missCount)) * 100).toFixed(
              2
            )
          : 0,
    };
  }

  // Clear cache
  clear() {
    this.cache.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.hitCount = 0;
    this.missCount = 0;
    this.operations = [];
  }

  // Get recent operations
  getRecentOperations(limit = 10) {
    return this.operations.slice(-limit).reverse();
  }
}