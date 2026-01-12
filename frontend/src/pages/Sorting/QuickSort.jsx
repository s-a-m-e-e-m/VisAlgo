import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SortingQuiz from "../quizes/SortingQuiz";
import { Toaster } from "react-hot-toast";
import SortingNavigator from "./SortingNavigator";

export default function QuickSortVisualizer() {
  const [array, setArray] = useState([43, 23, 12, 29, 9, 34, 10]);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [highlighted, setHighlighted] = useState({ pivotIndex: null, i: null, j: null, left: null, right: null });
  const [partitionCount, setPartitionCount] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const partition = async (arr, left, right) => {
    const pivot = arr[right];
    let i = left - 1;
    setHighlighted({ pivotIndex: right, i: null, j: null, left, right });

    for (let j = left; j < right; j++) {
      setHighlighted({ pivotIndex: right, i, j, left, right });
      await delay(600);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setHighlighted({ pivotIndex: right, i, j, left, right });
        await delay(600);
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    setArray([...arr]);
    setHighlighted({ pivotIndex: i + 1, i: i + 1, j: right, left, right });
    await delay(400);
    setPartitionCount((c) => (c == null ? 1 : c + 1));
    return i + 1;
  };

  const quickSortAsync = async (arr, left, right) => {
    if (left < right) {
      const p = await partition(arr, left, right);
      await quickSortAsync(arr, left, p - 1);
      await quickSortAsync(arr, p + 1, right);
    } else {
      // small segment — show it briefly
      setHighlighted({ pivotIndex: null, i: null, j: null, left, right });
      await delay(600);
    }
  };

  function Legend() {
    const items = [
      { color: "bg-blue-500", label: "Active Partition Range" },
      { color: "bg-red-500", label: "Pivot Index" },
      { color: "bg-yellow-400", label: "Compare Index (j)" },
      { color: "bg-green-500", label: "Swap Index (i)" },
      { color: "bg-gray-400", label: "Inactive Elements" },
    ];

    return (
    <div className="flex flex-wrap justify-center gap-1 mt-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex space-x-2">
          <div className={`w-6 h-6 rounded ${item.color}`}></div>
          <span className="text-sm text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <SortingNavigator />

      <h1 className="text-3xl font-bold mb-4 mt-4">Quick Sort</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Quick Sort?</h2>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Quick Sort</strong> is a highly efficient divide-and-conquer sorting algorithm. It works by
          selecting a <em>pivot</em> element, partitioning the array into two subarrays (elements less than the
          pivot and elements greater than the pivot), and then recursively sorting the subarrays.
        </p>
        <hr className="mb-4" />
        <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Divide-and-conquer approach.</li>
          <li>Partitions the array around a pivot element.</li>
          <li>Efficient for large datasets and widely used in practice.</li>
          <li>Not stable (equal elements may change relative order).</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🔹 Pseudocode</h3>
        <pre className="bg-black text-green-300 p-0 md:p-3 rounded overflow-x-auto text-sm">
          {`QUICK_SORT(A, low, high):
    IF low < high:
        pivotIndex = PARTITION(A, low, high)
        QUICK_SORT(A, low, pivotIndex - 1)
        QUICK_SORT(A, pivotIndex + 1, high)

PARTITION(A, low, high):
    pivot = A[high]
    i = low - 1
    FOR j = low TO high - 1:
        IF A[j] <= pivot:
            i = i + 1
            SWAP A[i] WITH A[j]
    SWAP A[i+1] WITH A[high]
    RETURN i+1`}
        </pre>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Best Case: <code>O(n log n)</code> (balanced partitions)</li>
          <li>Average Case: <code>O(n log n)</code></li>
          <li>Worst Case: <code>O(n²)</code> (poor pivot choices, e.g., already sorted array with last element as pivot)</li>
          <li>Space Complexity: <code>O(log n)</code> (recursive stack)</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>General-purpose sorting in many libraries and systems.</li>
          <li>Efficient for large datasets where average performance matters.</li>
          <li>Forms the basis of hybrid algorithms like Introsort (used in C++ STL sort).</li>
        </ul>
      </div>

      <h2 className="text-2xl  font-semibold mb-2">Quick Sort Visualizer</h2>
      {/* Active partition range guide */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          {isFinished ? "Final sorted" : `Partitions: ${partitionCount ?? 0}`}
        </span>
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter elements"
          className="border border-gray-400 rounded-md p-2"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-600 disabled:opacity-50"
          onClick={async () => {
            setIsSorting(true);
            setPartitionCount(0);
            setIsFinished(false);
            await quickSortAsync(array, 0, array.length - 1);
            setHighlighted({ pivotIndex: null, i: null, j: null, left: null, right: null });
            setIsFinished(true);
            setIsSorting(false);
          }}
          disabled={isSorting || array.length === 0}
        >
          Sort
        </button>
        </div>
        <div className="flex gap-2">
        <button
          className="p-2 bg-green-500 text-white text-lg rounded hover:bg-green-600 disabled:opacity-50 cursor-pointer"
          onClick={() => {
            const newElements = inputValue
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "")
              .map((item) => Number(item));
            if (newElements.length === 0) {
              setInputValue("");
              return;
            }
            setArray((prev) => [...prev, ...newElements]);
            setInputValue("");
          }}
          disabled={isSorting}
        >
          Insert
        </button>
        <button
          className="p-2 bg-red-500 text-white text-lg rounded-md cursor-pointer hover:bg-red-600 disabled:opacity-50"
          onClick={() => {
            setArray([]);
            setPartitionCount(null);
            setIsFinished(false);
          }}
          disabled={isSorting}
        >
          Clear
        </button>
        </div>
      </div>

      {/* Boxes */}
      <div className="flex">
        <AnimatePresence initial={false}>
          {array.map((val, idx) => {
            const isPivotIndex = idx === highlighted?.pivotIndex;
            const isCompare = idx === highlighted?.j;
            const isSwapIndex = idx === highlighted?.i;
            const inActiveRange =
              highlighted && highlighted.left != null && highlighted.right != null
                ? idx >= highlighted.left && idx <= highlighted.right
                : false;

            const bg = isFinished
              ? "bg-blue-500"
              : isPivotIndex
                ? "bg-red-500"
                : isCompare
                  ? "bg-yellow-400"
                  : isSwapIndex
                    ? "bg-green-500"
                    : inActiveRange
                      ? "bg-blue-500"
                      : "bg-gray-400";

            return (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md text-white font-bold ${bg} ring-1 ring-white/40`}
                title={`idx:${idx} val:${val}`}
                layout
              >
                {val}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Legend className="mt-4 mb-8" />
      <SortingQuiz />
    </div>
  );
}