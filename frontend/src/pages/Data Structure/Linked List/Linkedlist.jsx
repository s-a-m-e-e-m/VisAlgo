import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LinkedlistQuiz from "../../quizes/LinkedlistQuiz";
import NavigationLL from "./NavigationLL";

const Linkedlist = () => {
  const [ele, setEle] = useState("");
  const [linkedList, setLinkedList] = useState([]);
  const [position, setPosition] = useState("");

  const handleInsertAtHead = (value) => {
    if (value === "") {
      toast.error("Please enter a value before inserting at head.");
      return;
    }
    setLinkedList((prev) => [value, ...prev]);
    setEle("");
  };

  const handleInsertAtEnd = (value) => {
    if (value === "") {
      toast.error("Please enter a value before inserting at tail.");
      return;
    }
    setLinkedList((prev) => [...prev, value]);
    setEle("");
  };

  const handleDeleteFromHead = () => {
    if (linkedList.length === 0) {
      toast.error("Linked list is empty! Nothing to delete from head.");
      return;
    }
    const val = linkedList[0];
    setLinkedList((prev) => prev.slice(1));
  };

  const handleDeleteFromTail = () => {
    if (linkedList.length === 0) {
      toast.error("Linked list is empty! Nothing to delete from tail.");
      return;
    }
    setLinkedList((prev) => prev.slice(0, -1));
  };

  const handleInsertAtPosition = (value, pos) => {
    if (value === "" || pos === "") {
      toast.error("Enter both value and position.");
      return;
    }
    const index = Number(pos);
    if (!Number.isInteger(index) || index < 0 || index > linkedList.length) {
      toast.error("Invalid position for insert.");
      return;
    }
    setLinkedList((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index),
    ]);
    setPosition("");
    setEle("");
  };

  const handleDeleteAtPosition = (pos) => {
    if (pos === "") {
      toast.error("Enter a position to delete.");
      return;
    }
    const index = Number(pos);
    if (!Number.isInteger(index) || index < 0 || index >= linkedList.length) {
      toast.error("Invalid position for delete.");
      return;
    }
    const val = linkedList[index];
    setLinkedList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setPosition("");
  };

  const handleClearLinkedList = () => {
    if (linkedList.length === 0) {
      toast("Linked list already empty.");
      return;
    }
    setLinkedList([]);
    setPosition("");
    setEle("");
  };

  const handleReverseLinkedList = () => {
    if (linkedList.length === 0) {
      toast.error("Linked list is empty! Nothing to reverse.");
      return;
    }
    setLinkedList((prev) => [...prev].reverse());
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <NavigationLL />
      <h1 className="font-bold text-3xl text-center mt-4 mb-4">Singly Linked List</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Singly Linked List?</h2>
        <p className="text-gray-700 text-lg mb-2">
          A <strong>Singly Linked List</strong> is a linear data structure where
          each node contains data and a pointer to the next node. Traversal is
          unidirectional, from head to tail.
        </p>
        <hr className="mb-4" />
        <h3 className="text-2xl font-semibold mb-2">⚙️ Operations</h3>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
          <li>
            <strong>Insert at Head:</strong> Add a node at the beginning.
          </li>
          <li>
            <strong>Insert at Tail:</strong> Add a node at the end.
          </li>
          <li>
            <strong>Insert/Delete at Position:</strong> Add or remove a node at
            a specific index.
          </li>
          <li>
            <strong>Reverse:</strong> Reverse the order of nodes.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
          <li>Insert at head: <code>O(1)</code></li>
          <li>
            Insert at tail: <code>O(1)</code> if tail pointer maintained, else{" "}
            <code>O(n)</code>
          </li>
          <li>Insert/Delete at position: <code>O(n)</code></li>
          <li>Search: <code>O(n)</code></li>
          <li>Reverse: <code>O(n)</code></li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li>Dynamic data structures with frequent insertions/deletions</li>
          <li>Implementing stacks, queues, and adjacency lists</li>
          <li>Polynomial representation and sparse data</li>
          <li>Undo/redo operations with node-based histories</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="w-min-3xl flex flex-wrap gap-2 flex-col">
        <h3 className="text-2xl font-semibold mb-2">Singly Linked List Visualization</h3>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            placeholder="Enter value"
            value={ele}
            onChange={(e) => setEle(e.target.value)}
            className="border border-gray-400 rounded-md p-2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleInsertAtHead(ele)} className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 text-lg">
              Insert At Head
            </button>
            <button
              onClick={() => handleInsertAtEnd(ele)} className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 text-lg">
              Insert At Tail
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            value={position}
            placeholder="Enter position"
            onChange={(e) => setPosition(e.target.value)}
            className="border border-gray-400 rounded-md p-2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleInsertAtPosition(ele, position)}
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 md:text-lg">
              Insert At Position
            </button>
            <button
              onClick={() => handleDeleteAtPosition(position)}
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 md:text-lg">
              Delete At Position
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDeleteFromHead}
            className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600 md:text-lg">
            Delete From Head
          </button>
          <button
            onClick={handleDeleteFromTail}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 md:text-lg"
          >
            Delete From Tail
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClearLinkedList}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 md:text-lg"
            disabled={linkedList.length === 0}>
            Delete Linked List
          </button>
          <button
            onClick={handleReverseLinkedList}
            className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600 md:text-lg"
          >
            Reverse Linked List
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="mt-6 flex flex-col items-center mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <AnimatePresence>
            {linkedList.map((nodeVal, i) => (
              <motion.div
                key={`${nodeVal}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
                  {nodeVal}
                </div>
                {i !== linkedList.length - 1 ? (
                  <MdArrowRightAlt className="text-green-700 text-2xl" />
                ) : (
                  ""
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <span className="text-gray-600 mb-4 translate-y-[4px] text-xl">
          Singly Linked List
        </span>
      </div>

      <LinkedlistQuiz />
    </div>
  );
};

export default Linkedlist;