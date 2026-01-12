import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import SortingQuiz from "../quizes/SortingQuiz";
import SortingNavigator from "./SortingNavigator";;

function Legend() {
  const items = [
    { color: "bg-red-500", label: "Current Minimum Index" },
    { color: "bg-yellow-400", label: "Compare Index (j)" },
    { color: "bg-green-500", label: "Swap Index (i)" },
    { color: "bg-blue-500", label: "Sorted Portion" },
    { color: "bg-gray-400", label: "Unsorted Portion" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded ${item.color}`}></div>
          <span className="text-sm text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState([43, 23, 12, 29, 9, 34, 10]);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [highlighted, setHighlighted] = useState({ minIndex: null, j: null });
  const [iteration, setIteration] = useState(null);

  // Animated selection sort (in-place) — mirrors BubbleSort behavior
  const selectionSorting = async () => {
    setIsSorting(true);
    const tempArr = [...array];

    for (let i = 0; i < tempArr.length - 1; i++) {
      setIteration(i + 1);
      let minIndex = i;
      setHighlighted({ minIndex, j: null });

      for (let j = i + 1; j < tempArr.length; j++) {
        setHighlighted({ minIndex, j });
        await new Promise((res) => setTimeout(res, 500));

        if (tempArr[j] < tempArr[minIndex]) {
          minIndex = j;
          setHighlighted({ minIndex, j });
          await new Promise((res) => setTimeout(res, 300));
        }
      }

      if (minIndex !== i) {
        [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
        setArray([...tempArr]);
        setHighlighted({ minIndex: i, j: minIndex });
        await new Promise((res) => setTimeout(res, 700));
      }
    }

    setHighlighted({ minIndex: null, j: null });
    setIteration(tempArr.length); // mark all as sorted (blue)
    setIsSorting(false);
  };

  const clearArray = () => {
    setArray([]);
    setIteration(null);
    setHighlighted({ minIndex: null, j: null });
  };

  const insertInArray = () => {
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
  };

  const sortNow = () => selectionSorting();

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <SortingNavigator />

      <h1 className="text-3xl font-bold mb-4 mt-4">Selection Sort</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Selection Sort?</h2>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Selection Sort</strong> is a simple comparison-based sorting algorithm. It repeatedly selects
          the smallest (or largest) element from the unsorted portion of the array and swaps it with the first
          unsorted element, gradually growing the sorted portion of the array.
        </p>
        <hr className="mb-4" />
        <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Divides the array into a sorted and an unsorted portion.</li>
          <li>Finds the minimum element in the unsorted portion and places it at the beginning.</li>
          <li>Simple to implement but inefficient for large datasets.</li>
          <li>Not a stable sorting algorithm (equal elements may change relative order).</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🔹 Pseudocode</h3>
        <pre className="bg-black text-green-300 p-0 md:p-3 rounded overflow-x-auto text-sm">
          {`SELECTION_SORT(A):
    n = length(A)
    FOR i = 0 TO n-1:
        minIndex = i
        FOR j = i+1 TO n-1:
            IF A[j] < A[minIndex]:
                minIndex = j
        SWAP A[i] WITH A[minIndex]`}
        </pre>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Best Case: <code>O(n²)</code></li>
          <li>Average Case: <code>O(n²)</code></li>
          <li>Worst Case: <code>O(n²)</code></li>
          <li>Space Complexity: <code>O(1)</code> (in-place)</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>Educational purposes to demonstrate sorting concepts.</li>
          <li>Useful when memory space is extremely limited (in-place sorting).</li>
          <li>Rarely used in practice due to inefficiency compared to other algorithms.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Selection Sort Visualizer</h2>

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
          onClick={sortNow}
          disabled={isSorting}
        >
          Sort
        </button>
        </div>
        <div className="flex gap-2">
        <button
          className="p-2 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 disabled:opacity-50"
          onClick={insertInArray}
          disabled={isSorting}
        >
          Insert
        </button>
        <button
          className="p-2 bg-red-500 text-white text-lg rounded-md cursor-pointer hover:bg-red-600 disabled:opacity-50"
          onClick={clearArray}
          disabled={isSorting}
        >
          Clear
        </button>
        </div>
      </div>

      {/* Boxes */}
      <div className="flex">
        <AnimatePresence initial={false}>
          {array.map((ele, idx) => {
            const isMin = idx === highlighted?.minIndex;
            const isCompare = idx === highlighted?.j;
            const isSorted = iteration !== null && idx < iteration;

            const bg = isMin
              ? "bg-red-500"
              : isCompare
                ? "bg-yellow-400"
                : isSorted
                  ? "bg-blue-500"
                  : "bg-gray-400";

            return (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-10 w-10 md:w-12 md:h-12 flex items-center justify-center rounded-md text-white font-bold ${bg} ring-1 ring-white/40`}
                layout
              >
                {ele}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {iteration !== null && (
        <div className="text-xl font-semibold text-purple-600 mb-4">
          {iteration === array.length ? (new Promise((res) => setTimeout(res, 500)), "Sorting Complete!") : `Iteration: ${iteration}`}
          
        </div>
      )}

      <Legend className="mt-4 mb-8" />
      <SortingQuiz />
    </div>
  );
}