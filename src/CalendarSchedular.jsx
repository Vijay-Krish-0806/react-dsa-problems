import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Core Data Structures and Algorithms
class Interval {
  constructor(start, end, title, type = "meeting") {
    this.start = start;
    this.end = end;
    this.title = title;
    this.type = type;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

class IntervalTree {
  constructor() {
    this.intervals = [];
  }

  // Insert interval maintaining sorted order - O(n) worst case, O(log n) average
  insert(interval) {
    const insertIndex = this.binarySearchInsert(interval.start);
    this.intervals.splice(insertIndex, 0, interval);
  }

  // Binary search for insertion point - O(log n)
  binarySearchInsert(start) {
    let left = 0,
      right = this.intervals.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.intervals[mid].start < start) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  // Remove interval - O(n)
  remove(intervalId) {
    const index = this.intervals.findIndex((i) => i.id === intervalId);
    if (index !== -1) {
      this.intervals.splice(index, 1);
    }
  }

  // Merge overlapping intervals - O(n)
  mergeOverlapping() {
    if (this.intervals.length <= 1) return this.intervals;

    const merged = [];
    let current = { ...this.intervals[0] };

    for (let i = 1; i < this.intervals.length; i++) {
      const next = this.intervals[i];

      if (current.end >= next.start) {
        // Overlapping intervals - merge them
        current.end = Math.max(current.end, next.end);
        current.title = `${current.title} & ${next.title}`;
        current.type = "merged";
      } else {
        // No overlap - add current to merged and move to next
        merged.push(current);
        current = { ...next };
      }
    }
    merged.push(current);
    return merged;
  }

  // Find gaps between intervals - O(n)
  findGaps(minDuration = 30) {
    const gaps = [];
    const merged = this.mergeOverlapping();

    // Gap before first interval
    if (merged.length > 0 && merged[0].start > 0) {
      gaps.push(new Interval(0, merged[0].start, "Free Time", "free"));
    }

    // Gaps between intervals
    for (let i = 0; i < merged.length - 1; i++) {
      const gapStart = merged[i].end;
      const gapEnd = merged[i + 1].start;

      if (gapEnd - gapStart >= minDuration) {
        gaps.push(new Interval(gapStart, gapEnd, "Free Time", "free"));
      }
    }

    // Gap after last interval (assuming day ends at 24*60 = 1440 minutes)
    if (merged.length > 0 && merged[merged.length - 1].end < 1440) {
      gaps.push(
        new Interval(merged[merged.length - 1].end, 1440, "Free Time", "free")
      );
    }

    return gaps;
  }

  // Check if a time slot is available - O(log n) with binary search
  isSlotAvailable(start, end) {
    // Binary search for potential conflicts
    let left = 0,
      right = this.intervals.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const interval = this.intervals[mid];

      // Check for overlap: intervals overlap if start < interval.end && end > interval.start
      if (start < interval.end && end > interval.start) {
        return false; // Conflict found
      }

      if (interval.end <= start) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return true; // No conflicts found
  }

  // Get all intervals in time range - O(log n + k) where k is number of results
  getIntervalsInRange(start, end) {
    const result = [];

    // Binary search for first potential interval
    let left = 0,
      right = this.intervals.length - 1;
    let firstIndex = this.intervals.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.intervals[mid].end > start) {
        firstIndex = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // Collect all overlapping intervals
    for (
      let i = firstIndex;
      i < this.intervals.length && this.intervals[i].start < end;
      i++
    ) {
      result.push(this.intervals[i]);
    }

    return result;
  }

  getAllIntervals() {
    return this.intervals;
  }

  clear() {
    this.intervals = [];
  }
}

// Utility functions
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const getTypeColor = (type) => {
  switch (type) {
    case "meeting":
      return "bg-blue-500";
    case "task":
      return "bg-green-500";
    case "merged":
      return "bg-purple-500";
    case "free":
      return "bg-gray-200";
    default:
      return "bg-gray-400";
  }
};

const getTypeTextColor = (type) => {
  switch (type) {
    case "free":
      return "text-gray-700";
    default:
      return "text-white";
  }
};

function CalendarEventScheduler() {
  const [intervalTree] = useState(new IntervalTree());
  const [events, setEvents] = useState([]);
  const [showMerged, setShowMerged] = useState(false);
  const [showGaps, setShowGaps] = useState(false);
  const [minGapDuration, setMinGapDuration] = useState(30);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting",
  });
  const [searchSlot, setSearchSlot] = useState({
    duration: 60,
    preferredStart: "09:00",
    preferredEnd: "17:00",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [conflictCheck, setConflictCheck] = useState(null);

  // Sample data
  useEffect(() => {
    const sampleEvents = [
      new Interval(540, 600, "Daily Standup", "meeting"), // 9:00-10:00
      new Interval(660, 720, "Code Review", "task"), // 11:00-12:00
      new Interval(780, 840, "Lunch Break", "meeting"), // 13:00-14:00
      new Interval(900, 960, "Client Call", "meeting"), // 15:00-16:00
      new Interval(950, 1020, "Team Sync", "meeting"), // 15:50-17:00 (overlaps with above)
    ];

    intervalTree.clear();
    sampleEvents.forEach((event) => intervalTree.insert(event));
    setEvents(intervalTree.getAllIntervals());
  }, [intervalTree]);

  // Computed values using useMemo for performance
  const displayEvents = useMemo(() => {
    if (showMerged) {
      return intervalTree.mergeOverlapping();
    }
    return events;
  }, [events, showMerged, intervalTree]);

  const gaps = useMemo(() => {
    return intervalTree.findGaps(minGapDuration);
  }, [events, minGapDuration, intervalTree]);

  const addEvent = () => {
    if (!newEvent.title.trim()) return;

    const start = parseTime(newEvent.startTime);
    const end = parseTime(newEvent.endTime);

    if (start >= end) {
      alert("End time must be after start time");
      return;
    }

    const interval = new Interval(start, end, newEvent.title, newEvent.type);
    intervalTree.insert(interval);
    setEvents(intervalTree.getAllIntervals());

    setNewEvent({
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
    });
  };

  const removeEvent = (eventId) => {
    intervalTree.remove(eventId);
    setEvents(intervalTree.getAllIntervals());
  };

  const findFreeSlots = () => {
    const duration = parseInt(searchSlot.duration);
    const preferredStart = parseTime(searchSlot.preferredStart);
    const preferredEnd = parseTime(searchSlot.preferredEnd);

    const freeSlots = gaps.filter((gap) => {
      const gapDuration = gap.end - gap.start;
      return (
        gapDuration >= duration &&
        gap.start >= preferredStart &&
        gap.end <= preferredEnd
      );
    });

    const suggestions = freeSlots.map((slot) => ({
      start: slot.start,
      end: Math.min(slot.start + duration, slot.end),
      duration: duration,
    }));

    setSuggestions(suggestions);
  };

  const checkConflict = () => {
    const start = parseTime(newEvent.startTime);
    const end = parseTime(newEvent.endTime);

    if (start >= end) {
      setConflictCheck({ hasConflict: true, message: "Invalid time range" });
      return;
    }

    const isAvailable = intervalTree.isSlotAvailable(start, end);
    const conflictingEvents = intervalTree.getIntervalsInRange(start, end);

    setConflictCheck({
      hasConflict: !isAvailable,
      message: isAvailable ? "Time slot is available" : "Conflicts detected",
      conflicts: conflictingEvents,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Calendar Event Scheduler
            </h1>
          </div>
          <p className="text-gray-600">
            Advanced interval management with efficient data structures and
            algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Event Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Event
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, type: e.target.value })
                  }
                >
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={addEvent}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </button>
                <button
                  onClick={checkConflict}
                  className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Check Conflicts
                </button>
              </div>

              {conflictCheck && (
                <div
                  className={`p-3 rounded-md flex items-center gap-2 ${
                    conflictCheck.hasConflict
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {conflictCheck.hasConflict ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm">{conflictCheck.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Free Slots Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Free Slots
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="480"
                  step="15"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchSlot.duration}
                  onChange={(e) =>
                    setSearchSlot({ ...searchSlot, duration: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Start
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchSlot.preferredStart}
                    onChange={(e) =>
                      setSearchSlot({
                        ...searchSlot,
                        preferredStart: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred End
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchSlot.preferredEnd}
                    onChange={(e) =>
                      setSearchSlot({
                        ...searchSlot,
                        preferredEnd: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                onClick={findFreeSlots}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Find Available Slots
              </button>

              {suggestions.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Suggested Time Slots:
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-green-50 p-2 rounded border"
                      >
                        <span className="text-sm font-medium text-green-800">
                          {formatTime(slot.start)} - {formatTime(slot.end)}
                        </span>
                        <span className="text-xs text-green-600 ml-2">
                          ({slot.duration} min)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View Controls Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              View Controls
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showMerged"
                  checked={showMerged}
                  onChange={(e) => setShowMerged(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="showMerged"
                  className="text-sm font-medium text-gray-700"
                >
                  Show Merged Intervals
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showGaps"
                  checked={showGaps}
                  onChange={(e) => setShowGaps(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="showGaps"
                  className="text-sm font-medium text-gray-700"
                >
                  Show Free Time Gaps
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Gap Duration (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="240"
                  step="15"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={minGapDuration}
                  onChange={(e) => setMinGapDuration(parseInt(e.target.value))}
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-700 mb-2">
                  Algorithm Stats:
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Events: {events.length}</div>
                  <div>Merged: {intervalTree.mergeOverlapping().length}</div>
                  <div>Free Slots: {gaps.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Timeline */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Calendar Timeline</h2>

          <div className="relative">
            {/* Time markers */}
            <div className="flex text-xs text-gray-500 mb-2">
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i} className="flex-1 text-center">
                  {i.toString().padStart(2, "0")}:00
                </div>
              ))}
            </div>

            {/* Events */}
            <div className="relative h-20 bg-gray-100 rounded mb-4">
              {displayEvents.map((event, index) => {
                const left = (event.start / 1440) * 100;
                const width = ((event.end - event.start) / 1440) * 100;

                return (
                  <div
                    key={event.id || index}
                    className={`absolute h-8 ${getTypeColor(
                      event.type
                    )} ${getTypeTextColor(event.type)} 
                              rounded text-xs flex items-center justify-center cursor-pointer
                              hover:opacity-80 transition-opacity`}
                    style={{ left: `${left}%`, width: `${width}%`, top: "6px" }}
                    onClick={() => !showMerged && removeEvent(event.id)}
                    title={`${event.title} (${formatTime(
                      event.start
                    )} - ${formatTime(event.end)})`}
                  >
                    <span className="truncate px-1">{event.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Free time gaps */}
            {showGaps && (
              <div className="relative h-6 bg-gray-50 rounded mb-2">
                {gaps.map((gap, index) => {
                  const left = (gap.start / 1440) * 100;
                  const width = ((gap.end - gap.start) / 1440) * 100;

                  return (
                    <div
                      key={index}
                      className="absolute h-4 bg-green-200 border border-green-300 rounded text-xs 
                               flex items-center justify-center"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        top: "2px",
                      }}
                      title={`Free: ${formatTime(gap.start)} - ${formatTime(
                        gap.end
                      )} (${gap.end - gap.start} min)`}
                    >
                      <span className="text-green-700 text-xs truncate px-1">
                        {gap.end - gap.start}m
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Task</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Merged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
              <span>Free Time</span>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Events List</h2>

          <div className="space-y-2">
            {displayEvents.map((event, index) => (
              <div
                key={event.id || index}
                className={`p-3 rounded-md border flex items-center justify-between
                          ${
                            event.type === "merged"
                              ? "bg-purple-50 border-purple-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getTypeColor(
                      event.type
                    )}`}
                  ></div>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {formatTime(event.start)} - {formatTime(event.end)}
                      <span className="ml-2 text-xs text-gray-500">
                        ({event.end - event.start} min)
                      </span>
                    </div>
                  </div>
                </div>

                {!showMerged && (
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarEventScheduler;
