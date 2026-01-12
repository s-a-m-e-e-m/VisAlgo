import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import SortingQuiz from "../quizes/SortingQuiz";
import SortingNavigator from "./SortingNavigator";

const BubbleSort = () => {
  const [array, setArray] = useState([43, 23, 12, 29, 9, 34, 10]);
  const [inputValue, setInputValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [highlighted, setHighlighted] = useState({ i: null, j: null });
  const [iteration, setIteration] = useState(null); // track outer loop iteration

  const bubbleSorting = async () => {
    setIsSorting(true);
    let tempArr = [...array];

    for (let i = 0; i < tempArr.length - 1; i++) {
      setIteration(i + 1); // update iteration number (1-based for clarity)

      for (let j = 0; j < tempArr.length - i - 1; j++) {
        setHighlighted({ i: j, j: j + 1 });
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (tempArr[j] > tempArr[j + 1]) {
          [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
          setArray([...tempArr]);
          await new Promise((resolve) => setTimeout(resolve, 700));
        }
      }
    }

    setHighlighted({ i: null, j: null });
    setIteration(tempArr.length); // mark all as sorted (blue)
    setIsSorting(false);
  };

  const clearArray = () => setArray([]);
  const insertInArray = () => {
    const newElements = inputValue
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "")
      .map((item) => Number(item));
    setArray((prev) => [...prev, ...newElements]);
    setInputValue("");
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <SortingNavigator />

      <h1 className="text-3xl font-bold mb-4 mt-4">Bubble Sort</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Bubble Sort?</h2>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Bubble Sort</strong> is a simple comparison-based sorting algorithm. It repeatedly steps
          through the list, compares adjacent elements, and swaps them if they are in the wrong order.
          This process continues until the list is sorted.
        </p>
        <hr className="mb-4" />
        <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Works by repeatedly swapping adjacent elements if they are out of order.</li>
          <li>After each iteration, the largest element "bubbles up" to its correct position.</li>
          <li>Simple to implement but inefficient for large datasets.</li>
        </ul>
    
        <h3 className="text-2xl font-semibold mt-4">🔹 Pseudocode</h3>
        <pre className="bg-black text-green-300 p-0 md:p-3 rounded overflow-x-auto text-sm">
          {`BUBBLE_SORT(A):
    n = length(A)
    FOR i = 0 TO n-1:
        FOR j = 0 TO n-i-2:
            IF A[j] > A[j+1]:
                SWAP A[j] WITH A[j+1]`}
        </pre>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Best Case (already sorted): <code>O(n)</code></li>
          <li>Average Case: <code>O(n²)</code></li>
          <li>Worst Case (reverse sorted): <code>O(n²)</code></li>
          <li>Space Complexity: <code>O(1)</code> (in-place)</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>Educational purposes to demonstrate sorting concepts.</li>
          <li>Useful for very small datasets.</li>
          <li>Rarely used in practice due to inefficiency compared to other algorithms.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Bubble Sort Visualizer</h2>
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
          className="p-2 bg-green-500 text-white cursor-pointer text-lg rounded-md hover:bg-green-600 disabled:opacity-50"
          onClick={bubbleSorting}
          disabled={isSorting}
        >
          Sort
        </button>
        </div>
        <div className="flex gap-2">
        <button
          className="p-2 bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-600 disabled:opacity-50"
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

      {/* Show current iteration */}
      {iteration !== null && (
        <div className="text-xl font-semibold text-purple-600 mb-4">
          {iteration === array.length ? (new Promise((res) => setTimeout(res, 500)), "Sorting Complete!") : `Iteration: ${iteration}`}
          
        </div>
      )}

      {/* Boxes */}
      <div className="flex flex-row flex-wrap justify-center">
        {array.map((ele, i) => {
          const isCompare = i === highlighted.i || i === highlighted.j;
          const isSorted =
            iteration !== null && i >= array.length - iteration; // sorted portion grows each iteration

          const bg = isCompare
            ? "bg-yellow-400"
            : isSorted
              ? "bg-blue-500"
              : "bg-gray-400";

          return (
            <motion.div
              key={i}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center text-lg font-bold w-10 h-10 
                        sm:w-12 sm:h-12 rounded-md text-white ring-1 ring-white/40 ${bg}`}
            >
              {ele}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-yellow-400"></div>
          <span className="text-sm text-gray-700">Compare Pair</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-blue-500"></div>
          <span className="text-sm text-gray-700">Sorted Portion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-gray-400"></div>
          <span className="text-sm text-gray-700">Unsorted Portion</span>
        </div>
      </div>

      <SortingQuiz />
    </div>
  );
};
export default BubbleSort;