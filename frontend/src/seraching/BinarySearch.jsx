import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import BinarysearchQuiz from "../pages/quizes/BinarysearchQuiz";

const BinarySearch = () => {
  const [array, setArray] = useState([43, 23, 12, 29, 9, 10, 34, 10]);
  const [inputValue, setInputValue] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [lo, setLo] = useState(null);
  const [hi, setHi] = useState(null);
  const [mid, setMid] = useState(null);

  const binarySearch = async () => {
    let sortedArray = [...array].sort((a, b) => a - b);
    let loVal = 0, hiVal = sortedArray.length - 1;
    let found = false;

    while (loVal <= hiVal) {
      let midVal = Math.floor((loVal + hiVal) / 2);

      // update state for visualization
      setLo(loVal);
      setHi(hiVal);
      setMid(midVal);
      setHighlightIndex(midVal);

      await new Promise((resolve) => setTimeout(resolve, 800)); // animation delay

      if (sortedArray[midVal] === Number(target)) {
        setResult(`Target ${target} found at index ${midVal}`);
        found = true;
        break;
      } else if (sortedArray[midVal] < Number(target)) {
        loVal = midVal + 1;
        await new Promise((resolve) => setTimeout(resolve, 800))
      } else {
        hiVal = midVal - 1;
        await new Promise((resolve) => setTimeout(resolve, 800))
      }
    }

    if (!found) setResult(`Target ${target} not found`);
    setInputValue("");
  };

  const clearArray = () => {
    setArray([]);
    setResult("");
    setHighlightIndex(null);
    setLo(null);
    setHi(null);
    setMid(null);
  };

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

      <h1 className="text-3xl font-bold text-blue-600 mb-4">Binary Search</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Binary Search?</h2>
        <p className="text-gray-700 mb-2">
          <strong>Binary Search</strong> is an efficient searching algorithm that works on sorted arrays.
          It repeatedly divides the search interval in half, comparing the target value to the middle element
          of the array. If the target is equal to the middle element, the search ends. Otherwise, the search
          continues in the left or right half depending on whether the target is smaller or larger.
        </p>

        <h3 className="text-lg font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-2">
          <li>Requires the array to be sorted.</li>
          <li>Divides the search space in half at each step.</li>
          <li>Much faster than linear search for large datasets.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">🔹 Pseudocode</h3>
        <pre className="bg-black text-green-300 p-3 rounded overflow-x-auto text-sm">
          {`BINARY_SEARCH(A, target):
    lo = 0
    hi = length(A) - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF A[mid] == target:
            RETURN mid
        ELSE IF A[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN -1   # target not found`}
        </pre>

        <h3 className="text-lg font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-2">
          <li>Best Case: <code>O(1)</code> (target is the middle element)</li>
          <li>Average Case: <code>O(log n)</code></li>
          <li>Worst Case: <code>O(log n)</code></li>
          <li>Space Complexity: <code>O(1)</code> (iterative)</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Searching in sorted arrays or lists.</li>
          <li>Efficient lookup in dictionaries or databases.</li>
          <li>Used in algorithms like binary search trees and divide-and-conquer problems.</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter elements"
          className="border w-[200px] p-2 rounded"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter target"
          className="border w-[200px] p-2 rounded"
          onChange={(e) => setTarget(e.target.value)}
        />
        <button
          className="p-2 bg-green-500 text-white text-lg rounded hover:bg-green-600"
          onClick={binarySearch}
        >
          Search
        </button>
        <button
          className="p-2 bg-red-500 text-white text-lg rounded hover:bg-red-600"
          onClick={clearArray}
        >
          Clear
        </button>
        <button
          className="p-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
          onClick={insertInArray}
        >
          Insert
        </button>
      </div>

      {/* Show current lo, hi, mid */}
      <div className="flex gap-6 text-lg font-semibold text-gray-700">
        <motion.div animate={{ scale: lo !== null ? 1.1 : 1 }}>
          lo: {lo !== null ? lo : "-"}
        </motion.div>
        <motion.div animate={{ scale: hi !== null ? 1.1 : 1 }}>
          hi: {hi !== null ? hi : "-"}
        </motion.div>
        <motion.div animate={{ scale: mid !== null ? 1.1 : 1 }}>
          mid: {mid !== null ? mid : "-"}
        </motion.div>
      </div>

      {/* Array visualization */}
      <div className="flex gap-2">
        {[...array].sort((a, b) => a - b).map((ele, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center text-lg font-semibold 
                        w-12 h-12 rounded-md text-white ring-1 ring-white/40 ${highlightIndex === i ? "bg-yellow-300" : "bg-blue-500"
              }`}
          >
            {ele}
          </motion.div>
        ))}
      </div>

      {/* Result */}
      <div className="mt-4 text-lg font-semibold text-purple-600">
        {result}
      </div>

      <BinarysearchQuiz />
    </div>
  );
};

export default BinarySearch;