import { useState, useCallback, useEffect } from "react";
import { LRUCache } from "./utils/lru";

// Node class for doubly linked list

function LRUCacheVisualizer() {
  const [cache, setCache] = useState(new LRUCache(4));
  const [capacity, setCapacity] = useState(4);
  const [putKey, setPutKey] = useState("");
  const [putValue, setPutValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [getResult, setGetResult] = useState(null);
  const [cacheItems, setCacheItems] = useState([]);
  const [stats, setStats] = useState({});
  const [operations, setOperations] = useState([]);

  // Update cache visualization
  const updateCacheView = useCallback(() => {
    setCacheItems(cache.getAll());
    setStats(cache.getStats());
    setOperations(cache.getRecentOperations());
  }, [cache]);

  // Initialize cache with sample data
  useEffect(() => {
    const newCache = new LRUCache(capacity);

    // Add some sample data
    newCache.put("A", 1);
    newCache.put("B", 2);
    newCache.put("C", 3);
    newCache.get("A"); // Move A to front

    setCache(newCache);
    setCacheItems(newCache.getAll());
    setStats(newCache.getStats());
    setOperations(newCache.getRecentOperations());
  }, [capacity]);

  const handlePut = () => {
    if (putKey.trim() && putValue.trim()) {
      cache.put(putKey.trim(), putValue.trim());
      setPutKey("");
      setPutValue("");
      updateCacheView();
    }
  };

  const handleGet = () => {
    if (getKey.trim()) {
      const result = cache.get(getKey.trim());
      setGetResult({ key: getKey.trim(), value: result });
      setGetKey("");
      updateCacheView();
    }
  };

  const handleDelete = (key) => {
    cache.delete(key);
    updateCacheView();
  };

  const handleClear = () => {
    cache.clear();
    updateCacheView();
    setGetResult(null);
  };

  const handleCapacityChange = (newCapacity) => {
    setCapacity(newCapacity);
    const newCache = new LRUCache(newCapacity);
    setCache(newCache);
    setCacheItems([]);
    setStats(newCache.getStats());
    setOperations([]);
    setGetResult(null);
  };

  const getResultColor = (result) => {
    switch (result) {
      case "HIT":
        return "text-green-600 bg-green-50";
      case "MISS":
        return "text-red-600 bg-red-50";
      case "ADD":
        return "text-blue-600 bg-blue-50";
      case "UPDATE":
        return "text-yellow-600 bg-yellow-50";
      case "REMOVED":
        return "text-purple-600 bg-purple-50";
      case "NOT_FOUND":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              LRU Cache Implementation
            </h1>
          </div>
          <p className="text-gray-600">
            Doubly Linked List + Hash Map • O(1) Get/Put/Delete Operations
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Capacity Control */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Cache Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <select
                  value={capacity}
                  onChange={(e) =>
                    handleCapacityChange(parseInt(e.target.value))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[2, 3, 4, 5, 6, 8, 10].map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleClear}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                Clear Cache
              </button>
            </div>
          </div>

          {/* PUT Operation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              PUT Operation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key
                </label>
                <input
                  type="text"
                  value={putKey}
                  onChange={(e) => setPutKey(e.target.value)}
                  placeholder="Enter key"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <input
                  type="text"
                  value={putValue}
                  onChange={(e) => setPutValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handlePut}
                disabled={!putKey.trim() || !putValue.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                PUT
              </button>
            </div>
          </div>

          {/* GET Operation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              GET Operation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key
                </label>
                <input
                  type="text"
                  value={getKey}
                  onChange={(e) => setGetKey(e.target.value)}
                  placeholder="Enter key to get"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleGet}
                disabled={!getKey.trim()}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                GET
              </button>
              {getResult && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    getResult.value === -1
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  Key: {getResult.key} →{" "}
                  {getResult.value === -1
                    ? "Not Found"
                    : `Value: ${getResult.value}`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cache Visualization */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Cache State (Most → Least Recently Used)
          </h3>

          {cacheItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Cache is empty</div>
          ) : (
            <div className="space-y-3">
              {cacheItems.map((item, index) => (
                <div
                  key={`${item.key}-${index}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">Key: {item.key}</div>
                      <div className="text-sm text-gray-600">
                        Value: {item.value}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.key)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                  ></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics and Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Cache Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">
                  {stats.size} / {stats.capacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hit Count:</span>
                <span className="font-medium text-green-600">
                  {stats.hitCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miss Count:</span>
                <span className="font-medium text-red-600">
                  {stats.missCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hit Rate:</span>
                <span className="font-medium">{stats.hitRate}%</span>
              </div>

              {/* Progress bar for hit rate */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Hit Rate</span>
                  <span>{stats.hitRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.hitRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Operations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Recent Operations
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {operations.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No operations yet
                </div>
              ) : (
                operations.map((op, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md text-sm ${getResultColor(
                      op.result
                    )}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{op.type}</span>
                      <span className="text-xs">{op.result}</span>
                    </div>
                    <div className="text-xs mt-1">
                      Key: {op.key}{" "}
                      {op.value !== null && `→ Value: ${op.value}`}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LRUCacheVisualizer;
