import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast';
import HashtableQuiz from '../quizes/HashtableQuiz'

const BUCKET_SIZE = 10;

const Hash = () => {
  const [buckets, setBuckets] = useState(Array(BUCKET_SIZE).fill([]));
  const [highlight, setHighlight] = useState(null);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState(""); const [findResult, setFindResult] = useState(null);

  const hash = (key) => key % BUCKET_SIZE;

  const insert = () => {
    const key = parseInt(keyInput);
    if (isNaN(key)) return;
    const value = valueInput || `Value${key}`;
    const index = hash(key);
    setHighlight(index);

    setBuckets((prev) => {
      const newBuckets = [...prev];
      newBuckets[index] = [...newBuckets[index], { key, value }];
      return newBuckets;
    });
    setFindResult(null);
    setKeyInput("");
    setValueInput("");
  };

  const remove = () => {
    const key = parseInt(keyInput);
    if (isNaN(key)) return;
    const index = hash(key);
    setHighlight(index);

    setBuckets((prev) => {
      const newBuckets = [...prev];
      newBuckets[index] = newBuckets[index].filter((node) => node.key !== key);
      return newBuckets;
    });
    setFindResult(null);
  };

  const find = () => {
    const key = parseInt(keyInput);
    const value = valueInput;
    if (isNaN(key)) return;
    const index = hash(key);
    setHighlight(index);

    const node = buckets[index].find((n) => n.key === key && n.value === value);
    setFindResult(node ? `Found key ${key} with value ${value} in bucket ${index}` : `Key ${key} with value ${value} not found`);

  };

  useEffect(() => {
    setFindResult(null);
  }, [keyInput, valueInput]);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />

      <h1 className="text-3xl text-center font-bold mb-4">Hash Map</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Hash Map?</h2>
        <p className="text-gray-700 mb-2 text-lg">
          A <strong>HashMap</strong> (Java’s implementation of the <em>Map</em> interface) is a data structure
          that stores key–value pairs. It uses a <em>hash function</em> to compute an index (bucket) where each
          key–value pair is stored, allowing for efficient insertion, deletion, and lookup operations.
        </p>

        <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Stores data as key–value pairs.</li>
          <li>Uses hashing to determine the bucket index for each key.</li>
          <li>Average time complexity for insert, delete, and find is <code>O(1)</code>.</li>
          <li>Keys must be unique; values can be duplicated.</li>
          <li>Not ordered — iteration order is not guaranteed.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🔹 Pseudocode</h3>
        <pre className="bg-black text-green-300 p-3 rounded overflow-x-auto text-md">
          {`PUT(map, key, value):
    index = HASH(key) % BUCKET_SIZE
    IF bucket[index] contains key:
        UPDATE value
    ELSE:
        INSERT (key, value) into bucket[index]

GET(map, key):
    index = HASH(key) % BUCKET_SIZE
    SEARCH bucket[index] for key
    RETURN value if found, else null

REMOVE(map, key):
    index = HASH(key) % BUCKET_SIZE
    DELETE key from bucket[index] if exists`}
        </pre>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Insertion: <code>O(1)</code> average</li>
          <li>Deletion: <code>O(1)</code> average</li>
          <li>Search: <code>O(1)</code> average</li>
          <li>Worst case (many collisions): <code>O(n)</code></li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>Implementing caches.</li>
          <li>Counting frequencies (word count, character count).</li>
          <li>Indexing and fast lookups.</li>
          <li>Database indexing and symbol tables.</li>
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-2 mt-4 ">HashMap Visualizer</h1>
      <p className="text-xl font-semibold text-gray-600 mb-6">
        HashMap Size: {BUCKET_SIZE}
      </p>

      {/* Input Fields */}
      <div className="flex flex-col gap-2 sm:flex-row space-x-4 mb-6">
        <input
          type="number"
          placeholder="Enter key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          className="border border-gray-400 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Enter value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          className="border border-gray-400 rounded-md p-2"
        />
        {keyInput && (
          <p className="text-lg">
            Index: {keyInput} % {BUCKET_SIZE} = {keyInput % BUCKET_SIZE}
          </p>
        )}
      </div>

      {/* Buckets */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {buckets.map((bucket, i) => (
          <motion.div
            key={i}
            className={`border rounded p-2 min-h-[50px] sm:min-h-[80px] ${highlight === i ? "bg-yellow-200" : "bg-gray-100"
              }`}
            animate={{ scale: highlight === i ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">Bucket {i}</p>
            <div className="flex space-x-2 mt-2">
              <AnimatePresence>
                {bucket.map((node, j) => (
                  <motion.div
                    key={j}
                    className="px-2 py-1 bg-blue-300 rounded"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {node.key}:{node.value}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={insert}
          className="p-2 text-lg bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Insert
        </button>
        <button
          onClick={remove}
          className="p-2 bg-red-500 text-white rounded-md text-lg hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={find}
          className="p-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600"
        >
          Find
        </button>
      </div>

      {/* Find Result */}
      <AnimatePresence>
        {findResult && (
          <motion.div
            className="mt-4 p-3 bg-purple-200 rounded text-lg font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {findResult}
          </motion.div>
        )}
      </AnimatePresence>
      <div className='mb-8'></div>

      <HashtableQuiz />
    </div>
  );
}

export default Hash
