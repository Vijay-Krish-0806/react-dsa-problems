import React, { useState, useEffect, useCallback } from "react";
import {
  AlertCircle,
  Plus,
  Trash2,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { DAG, PriorityQueue } from "./utils/dsa";

const TaskDependencyManager = () => {
  const [tasks, setTasks] = useState(new Map());
  const [dag, setDag] = useState(new DAG());
  const [priorityQueue, setPriorityQueue] = useState(new PriorityQueue());
  const [newTask, setNewTask] = useState({
    name: "",
    priority: 1,
    deadline: "",
    description: "",
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [dependencyFrom, setDependencyFrom] = useState("");
  const [dependencyTo, setDependencyTo] = useState("");
  const [error, setError] = useState("");
  const [executionOrder, setExecutionOrder] = useState([]);
  const [readyTasks, setReadyTasks] = useState([]);

  // Task statuses
  const [taskStatuses, setTaskStatuses] = useState(new Map());

  const generateId = () => Date.now().toString();

  const addTask = () => {
    if (!newTask.name.trim()) {
      setError("Task name is required");
      return;
    }

    const id = generateId();
    const task = {
      id,
      name: newTask.name,
      priority: parseInt(newTask.priority),
      deadline: newTask.deadline,
      description: newTask.description,
      createdAt: new Date().toISOString(),
    };

    // Add to tasks map
    setTasks((prev) => new Map(prev).set(id, task));

    // Add to DAG
    const newDag = new DAG();
    newDag.vertices = new Map(dag.vertices);
    newDag.edges = new Map(dag.edges);
    newDag.addVertex(id, task);
    setDag(newDag);

    // Add to priority queue
    const newPQ = new PriorityQueue();
    newPQ.heap = [...priorityQueue.heap];
    newPQ.insert(task);
    setPriorityQueue(newPQ);

    // Set initial status
    setTaskStatuses((prev) => new Map(prev).set(id, "pending"));

    setNewTask({ name: "", priority: 1, deadline: "", description: "" });
    setError("");
  };

  const deleteTask = (taskId) => {
    // Remove from tasks
    setTasks((prev) => {
      const newMap = new Map(prev);
      newMap.delete(taskId);
      return newMap;
    });

    // Remove from DAG
    const newDag = new DAG();
    newDag.vertices = new Map(dag.vertices);
    newDag.edges = new Map(dag.edges);
    newDag.removeVertex(taskId);
    setDag(newDag);

    // Rebuild priority queue without the deleted task
    const newPQ = new PriorityQueue();
    priorityQueue.heap.forEach((task) => {
      if (task.id !== taskId) {
        newPQ.insert(task);
      }
    });
    setPriorityQueue(newPQ);

    // Remove status
    setTaskStatuses((prev) => {
      const newMap = new Map(prev);
      newMap.delete(taskId);
      return newMap;
    });
  };

  const addDependency = () => {
    if (!dependencyFrom || !dependencyTo) {
      setError("Please select both tasks for dependency");
      return;
    }

    if (dependencyFrom === dependencyTo) {
      setError("A task cannot depend on itself");
      return;
    }

    try {
      const newDag = new DAG();
      newDag.vertices = new Map(dag.vertices);
      newDag.edges = new Map(dag.edges);
      newDag.addEdge(dependencyFrom, dependencyTo);
      setDag(newDag);
      setDependencyFrom("");
      setDependencyTo("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const updateExecutionOrder = useCallback(() => {
    if (dag.vertices.size > 0) {
      const order = dag.topologicalSort();
      setExecutionOrder(order);

      const ready = dag.getReadyTasks();
      setReadyTasks(ready);
    }
  }, [dag]);

  const executeNextTask = () => {
    if (priorityQueue.isEmpty()) return;

    const nextTask = priorityQueue.extractMin();
    setTaskStatuses((prev) => new Map(prev).set(nextTask.id, "completed"));

    // Update priority queue state
    const newPQ = new PriorityQueue();
    newPQ.heap = [...priorityQueue.heap];
    setPriorityQueue(newPQ);
  };

  const markTaskInProgress = (taskId) => {
    setTaskStatuses((prev) => new Map(prev).set(taskId, "in-progress"));
  };

  useEffect(() => {
    updateExecutionOrder();
  }, [updateExecutionOrder]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-300";
      case "in-progress":
        return "bg-blue-100 border-blue-300";
      case "pending":
        return "bg-yellow-100 border-yellow-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Task Dependency Manager
        </h1>
        <p className="text-gray-600">
          Advanced DSA Implementation: DAG, Priority Queue, Topological Sort
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Task Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task name"
              value={newTask.name}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>Low Priority</option>
              <option value={2}>Medium Priority</option>
              <option value={3}>High Priority</option>
              <option value={4}>Urgent</option>
            </select>

            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, deadline: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
            />

            <button
              onClick={addTask}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Tasks ({tasks.size})</h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Array.from(tasks.values()).map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedTask === task.id ? "ring-2 ring-blue-500" : ""
                } ${getStatusColor(taskStatuses.get(task.id) || "pending")}`}
                onClick={() => setSelectedTask(task.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(taskStatuses.get(task.id) || "pending")}
                    <span className="ml-2 font-medium">{task.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      P{task.priority}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markTaskInProgress(task.id);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {task.deadline && (
                  <div className="text-sm text-gray-500 mt-1">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </div>
                )}

                <div className="text-sm text-gray-600 mt-2">
                  Dependencies: {dag.getDependencies(task.id).length} |
                  Dependents: {dag.getDependents(task.id).length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Add Dependencies */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add Dependency</h2>

            <div className="space-y-4">
              <select
                value={dependencyFrom}
                onChange={(e) => setDependencyFrom(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select prerequisite task</option>
                {Array.from(tasks.values()).map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>

              <select
                value={dependencyTo}
                onChange={(e) => setDependencyTo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select dependent task</option>
                {Array.from(tasks.values()).map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>

              <button
                onClick={addDependency}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Dependency
              </button>
            </div>
          </div>

          {/* Priority Queue Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Priority Queue</h2>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Next Task: {priorityQueue.peek()?.name || "None"}
              </div>
              <div className="text-sm text-gray-600">
                Queue Size: {priorityQueue.size()}
              </div>

              <button
                onClick={executeNextTask}
                disabled={priorityQueue.isEmpty()}
                className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300"
              >
                Execute Next Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Order & Ready Tasks */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Execution Order (Topological Sort)
          </h2>
          <div className="space-y-2">
            {executionOrder.map((taskId, index) => (
              <div
                key={taskId}
                className="flex items-center p-2 bg-gray-50 rounded"
              >
                <span className="font-mono text-sm bg-blue-100 px-2 py-1 rounded mr-3">
                  {index + 1}
                </span>
                <span>{tasks.get(taskId)?.name || "Unknown Task"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ready to Execute</h2>
          <div className="space-y-2">
            {readyTasks.map((taskId) => (
              <div
                key={taskId}
                className="flex items-center p-2 bg-green-50 rounded"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>{tasks.get(taskId)?.name || "Unknown Task"}</span>
              </div>
            ))}
            {readyTasks.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No tasks ready for execution
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDependencyManager;
