import React, { useState } from "react";
import { motion } from "framer-motion";
import SortingQuiz from "../quizes/SortingQuiz";
import { Toaster } from "react-hot-toast";
import SortingNavigator from "./SortingNavigator";

const initialArray = [43, 23, 12, 29, 9, 10, 34, 10];
const orgArray = initialArray

export default function MergeSortVisualizer() {
  const [frames, setFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  /* ---------------- SPLIT PHASE ---------------- */

  const buildSplitLevels = (arr, depth, levels) => {
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(arr.map((v, i) => ({ value: v, id: `${depth}-${i}-${v}` })));

    if (arr.length <= 1) return;

    const mid = Math.floor(arr.length / 2);
    buildSplitLevels(arr.slice(0, mid), depth + 1, levels);
    buildSplitLevels(arr.slice(mid), depth + 1, levels);
  };

  /* ---------------- MERGE PHASE ---------------- */

  const merge = (left, right) => {
    let res = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i].value <= right[j].value) res.push(left[i++]);
      else res.push(right[j++]);
    }

    return [...res, ...left.slice(i), ...right.slice(j)];
  };

  const buildMergeFrames = (arr, frames) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = buildMergeFrames(arr.slice(0, mid), frames);
    const right = buildMergeFrames(arr.slice(mid), frames);

    const merged = merge(left, right);

    frames.push({
      phase: "merge",
      left,
      right,
      result: merged
    });

    return merged;
  };

  /* ---------------- MAIN HANDLER ---------------- */

  const handleSort = () => {
    const allFrames = [];

    // Split frames
    const splitLevels = [];
    buildSplitLevels(initialArray, 0, splitLevels);

    splitLevels.forEach((level) => {
      allFrames.push({
        phase: "split",
        levels: level
      });
    });

    // Merge frames
    const mergeFrames = [];
    const indexedArray = initialArray.map((v, i) => ({
      value: v,
      id: `base-${i}-${v}`
    }));

    buildMergeFrames(indexedArray, mergeFrames);
    allFrames.push(...mergeFrames);

    setFrames(allFrames);
    setCurrentFrame(0);
  };

  /* ---------------- RENDER HELPERS ---------------- */

  const renderBox = (item) => (
    <motion.div
      key={item.id}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-12 h-12 border border-white bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg"
    >
      {item.value}
    </motion.div>
  );

  /* ---------------- UI ---------------- */

  const frame = frames[currentFrame];

  return (
  <div className="p-6 flex flex-col items-center space-y-6 max-w-5xl mx-auto">
    <Toaster position="top-center" />
    <SortingNavigator />

    <h1 className="text-3xl font-bold mb-4 mt-4 text-center">Merge Sort</h1>

    {/* Theory Section */}
    <div className="bg-gray-50 p-4 rounded shadow mb-6">
      <h2 className="text-2xl font-semibold mb-2">📘 What is Merge Sort?</h2>
      <p className="text-gray-700 text-lg mb-2">
        <strong>Merge Sort</strong> is a classic divide-and-conquer sorting algorithm. It works by recursively
        splitting the array into halves until each subarray contains a single element, and then merging those
        subarrays back together in sorted order.
      </p>
      <hr className="mb-4" />
      <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
      <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
        <li>Uses the divide-and-conquer paradigm.</li>
        <li>Splits the array into halves recursively.</li>
        <li>Merges sorted halves to produce the final sorted array.</li>
        <li>Stable sorting algorithm (preserves relative order of equal elements).</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-4">🔹 Pseudocode</h3>
      <pre className="bg-black text-green-300 p-0 md:p-3 rounded overflow-x-auto text-sm">
{`MERGE_SORT(A):
    IF length(A) <= 1:
        RETURN A

    mid = length(A) / 2
    left  = MERGE_SORT(A[0..mid-1])
    right = MERGE_SORT(A[mid..end])

    RETURN MERGE(left, right)

MERGE(left, right):
    result = []
    WHILE left AND right are not empty:
        IF left[0] <= right[0]:
            APPEND left[0] TO result
            REMOVE left[0]
        ELSE:
            APPEND right[0] TO result
            REMOVE right[0]

    APPEND remaining elements of left TO result
    APPEND remaining elements of right TO result

    RETURN result`}
      </pre>

      <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
      <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
        <li>Best Case: <code>O(n log n)</code></li>
        <li>Average Case: <code>O(n log n)</code></li>
        <li>Worst Case: <code>O(n log n)</code></li>
        <li>Space Complexity: <code>O(n)</code> (extra space for merging)</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
      <ul className="list-disc text-lg pl-6 text-gray-700">
        <li>Sorting linked lists (efficient due to sequential access).</li>
        <li>External sorting (large datasets that don’t fit in memory).</li>
        <li>Used in hybrid algorithms like Timsort (Python’s built-in sort).</li>
      </ul>
    </div>

    <h2 className="text-2xl text-center font-semibold mb-2">Merge Sort Visualizer</h2>
    <div className="flex flex-row mb-2 justify-center">
    {initialArray.map((ele, i) => (
      <div
        key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-lg text-white border border-white bg-blue-500 flex items-center justify-center font-bold text-lg">{ele}</div>
    ))}
    </div>
    <button
      onClick={handleSort} className="p-2 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 mx-auto block">
      Sort
    </button>

    {frames.length > 0 && (
      <div className="flex flex-row mt-4">
        {orgArray.map((ele, i) => (
          <div
            key={i}
            className="h-10 w-10 md:w-12 md:h-12 border-4 border-white rounded-lg flex bg-blue-500 text-white items-center justify-center font-bold text-lg"
          >
            {ele}
          </div>
        ))}
      </div>
    )}

    {frames.length > 0 && (
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setCurrentFrame((p) => Math.max(p - 1, 0))}
          className="p-2 bg-gray-500 text-white rounded-md text-lg cursor pointer hover:bg-gray-600"
        >
          Prev
        </button>
        <button
          onClick={() =>
            setCurrentFrame((p) => Math.min(p + 1, frames.length - 1))
          }
          className="p-2 bg-gray-500 text-white rounded-md text-lg cursor pointer hover:bg-gray-600"
        >
          Next
        </button>
        <span className="font-bold">
          Step {currentFrame + 1} / {frames.length}
        </span>
      </div>
    )}

    {/* ---------- SPLIT VIEW ---------- */}
    {frame?.phase === "split" && (
      <div className="mt-8 flex justify-center gap-8">
        {frame.levels.map((subArr, idx) => (
          <div key={idx} className="flex">
            {subArr.map(renderBox)}
          </div>
        ))}
      </div>
    )}

    {/* ---------- MERGE VIEW ---------- */}
    <>
    {frame?.phase === "merge" && (
      
      <div className="mt-10 flex flex-col items-center gap-6 mb-8">
        <div className="flex">{frame.left.map(renderBox)}</div>
        <div className="flex">{frame.right.map(renderBox)}</div>
        <div className="flex mt-4 border-t-2 pt-4">
          {frame.result.map(renderBox)}
        </div>
      </div>
    )}

    
    {currentFrame === frames.length - 1 && (
      <div className="mt-4 text-gray-600 text-lg">
        Sorting Complete!
      </div>
    )}
    </>

    <SortingQuiz />
  </div>
);
}
