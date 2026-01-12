import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import StackQuiz from "../quizes/StackQuiz";

const Stack = () => {
  const [value, setValue] = useState("");
  const [stack, setStack] = useState([]);
  const [peekedValue, setPeekedValue] = useState("");

  const handlePush = () => {
    if (value === "") {
      toast.error("Please enter a value before pushing!");
      return;
    }
    setStack((prev) => [...prev, value]);
    setValue("");
    setPeekedValue("")
  };

  const handlePop = () => {
    if (stack.length === 0) {
      toast.error("Stack is empty! Nothing to pop.");
      return;
    }
    setStack((prev) => prev.slice(0, -1));
    setPeekedValue("")
  };

  const handlePeek =() => {
    if (stack.length === 0) {
      setPeekedValue("Stack is empty! Nothing to peek.");
      return;
    }
    const topElement = stack[stack.length - 1];
    setPeekedValue(`Top element is: ${topElement}`);
  }

  const handleClear = () => {
    setStack([]);
    setPeekedValue("")
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-center mb-4">Stack</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Stack?</h2>
        <p className="text-gray-700 mb-2 text-lg">
          A stack is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle.
        </p>
        <hr className="mb-4" />
        <h3 className="text-2xl font-semibold mb-2">⚙️ Operations</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-2 text-lg">
          <li><strong>Push:</strong> Insert an element at the top.</li>
          <li><strong>Pop:</strong> Remove the top element.</li>
          <li><strong>Peek:</strong> View the top element without removing it.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li>Push: <code>O(1)</code></li>
          <li>Pop: <code>O(1)</code></li>
          <li>Peek: <code>O(1)</code></li>
          <li>Search (in array-based stack): <code>O(n)</code></li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>Undo/Redo functionality in editors</li>
          <li>Expression evaluation (postfix/prefix)</li>
          <li>Function call management (recursion stack)</li>
          <li>Backtracking algorithms (DFS, maze solving)</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold mb-2">Stack Visualizer</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border border-gray-400 rounded-md p-2"
        />
        <button
          onClick={handlePush}
          className="bg-green-500 text-white p-2 rounded-md text-lg cursor-pointer hover:bg-green-600"
        >
          Push
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handlePop}
          className="bg-blue-500 text-white p-2 rounded-md text-lg cursor-pointer hover:bg-blue-600"
        >
          Pop
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white p-2 rounded-md text-lg cursor-pointer hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={handlePeek}
          className="bg-blue-500 text-white p-2 rounded-md text-lg cursor-pointer hover:bg-blue-600"
        >
          Peek
        </button>
      </div>

      {peekedValue.length>0 && <p className="text-lg">{peekedValue}</p>}
      
      <div className="flex flex-col items-center mb-8">
        {/* Stack visual */}
        <div className="border-2 border-black w-48 min-h-[300px] mx-auto flex flex-col-reverse items-center p-2 bg-gray-100">
          {stack.map((item, index) => (
            <div
              key={index}
              className="w-24 h-10 bg-green-600 text-white flex items-center justify-center rounded mb-2 shadow transition-transform duration-300"
            >
              {item}
            </div>
          ))}
        </div>
        <span className="text-center text-gray-600 mt-2 text-lg">Stack</span>
      </div>
      <StackQuiz className="mt-8" />
    </div>
  );
};

export default Stack;