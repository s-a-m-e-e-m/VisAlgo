import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import LinkedlistQuiz from "../../quizes/LinkedlistQuiz";
import NavigationLL from './NavigationLL';

const CircularLL = () => {
    const [ele, setEle] = useState("");
    const [linkedList, setLinkedList] = useState([]);
    const [position, setPosition] = useState("")

    const handleInsertAtHead = (value) => {
        setLinkedList((prev) => [value, ...prev]);
        setEle("");
    };

    const handleInsertAtEnd = (value) => {
        setLinkedList((prev) => [...prev, value]);
        setEle("");
    };

    const handleDeleteFromHead = () => {
        let val = linkedList[0];
        setLinkedList((prev) => (prev).slice(1))
    }

    const handleDeleteFromTail = () => {
        let val = linkedList[linkedList.length - 1];
        setLinkedList((prev) => (prev).slice(0, -1));
    }

    const handleInsertAtPosition = (ele, pos) => {
        const index = parseInt(pos);
        setLinkedList((prev) => [
            ...prev.slice(0, index),
            ele,
            ...prev.slice(index),
        ]);
        setPosition("");
        setEle("")
    };

    const handleDeleteAtPosition = (pos) => {
        const index = parseInt(pos);
        let val = linkedList[index];
        setLinkedList((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ]);
        setPosition("");
    };

    const handleClearLinkedList = () => {
        setLinkedList([]);
        setPosition('');
        setEle('');
    }

    const handleReverseLinkedList = () => {
        setLinkedList((prev) => (prev).reverse());
    }
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <NavigationLL />
            <h1 className="font-bold text-3xl text-center mt-4 mb-4">Doubly Circular Linked List</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Doubly Circular Linked List?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Doubly Circular Linked List</strong> is a variation of the linked list where each node contains
                    data, a pointer to the next node, and a pointer to the previous node. Unlike a standard doubly linked list,
                    the last node connects back to the head and the head connects back to the tail, forming a continuous loop
                    in both directions.
                </p>
                <hr className='mb-4' />

                <h3 className="text-2xl font-semibold mt-4">⚙️ Operations</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li><strong>Insertion:</strong> At head, tail, or a specific position with both pointers updated.</li>
                    <li><strong>Deletion:</strong> From head, tail, or a specific position, reconnecting neighbors.</li>
                    <li><strong>Traversal:</strong> Can move forward or backward continuously around the circle.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Each node has <code>data</code>, <code>next</code>, and <code>prev</code> pointers.</li>
                    <li>The last node’s <code>next</code> points to the head, and the head’s <code>prev</code> points to the tail.</li>
                    <li>Traversal is possible in both forward and backward directions.</li>
                    <li>No node points to <code>NULL</code>; the structure is fully circular.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Insert at head/tail: <code>O(1)</code></li>
                    <li>Delete at head/tail: <code>O(1)</code></li>
                    <li>Insert/Delete at position: <code>O(n)</code></li>
                    <li>Traversal/Search: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li>Navigation systems requiring forward/backward looping.</li>
                    <li>Music or video playlists with repeat functionality.</li>
                    <li>Deque implementations with circular behavior.</li>
                    <li>Advanced memory management and scheduling algorithms.</li>
                </ul>
            </div>

            {/* Controls */}
            <div className="w-min-3xl flex flex-wrap gap-2 flex-col">
                <h3 className="text-2xl font-semibold mb-2">Doubly Circular Linked List Visualization</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="number"
                        placeholder="Enter value"
                        value={ele}
                        onChange={(e) => setEle(e.target.value)}
                        className="border border-gray-400 rounded-md p-2"
                    />
                    <div className='flex gap-2'>
                    <button
                        onClick={() => handleInsertAtHead(ele)}
                        className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 text-md md:text-lg"
                    >
                        Insert At Head
                    </button>
                    <button
                        onClick={() => handleInsertAtEnd(ele)}
                        className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 text-md md:text-lg"
                    >
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
                    <div className='flex gap-2'>
                    <button
                        onClick={() => handleInsertAtPosition(ele, position)}
                        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 text-md md:text-lg"
                    >
                        Insert At Position
                    </button>
                    <button
                        onClick={() => handleDeleteAtPosition(position)}
                        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 text-md md:text-lg"
                    >
                        Delete At Position
                    </button>
                    </div>
                </div>

                <div className="flex flex-row gap-2">
                    <button
                        onClick={handleDeleteFromHead}
                        className="bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600 text-md md:text-lg"
                    >
                        Delete From Head
                    </button>
                    <button
                        onClick={handleDeleteFromTail}
                        className="bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600 text-md md:text-lg"
                    >
                        Delete From Tail
                    </button>
                </div>

                <div className='flex gap-2'>
                    <button
                        onClick={handleReverseLinkedList}
                        className="bg-green-500 text-white p-2 rounded-md cursor-pointer hover:bg-green-600 text-md md:text-lg"
                    >
                        Reverse Linked List
                    </button>
                    <button
                        onClick={handleClearLinkedList}
                        className="bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600 text-md md:text-lg"
                        disabled={linkedList.length === 0}
                    >
                        Delete Linked List
                    </button>
                </div>
            </div>

            {/* Visualization */}
            <div className="mt-6 flex flex-col items-center mb-8">
                <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mt-6 rounded-full border-4 border-black flex items-center justify-center bg-gray-100">
                    {linkedList.map((nodeVal, i) => {
                        const angle = (360 / linkedList.length) * i;
                        const isHead = i === 0;
                        const isTail = i === linkedList.length - 1;

                        return (
                            <div
                                key={`${nodeVal}-${i}`}
                                className={`absolute w-14 h-14 flex items-center justify-center rounded-full text-white font-bold shadow-md
                ${isHead ? "bg-blue-500" : isTail ? "bg-yellow-400 text-black" : "bg-green-500"}`}
                                style={{
                                    transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`,
                                }}
                            >
                                {nodeVal}
                            </div>
                        );
                    })}
                    {linkedList.length > 1 && (
                        <span className="absolute text-sm font-semibold text-gray-700">
                            Circular connection back to Head
                        </span>
                    )}
                </div>
                <span className="text-gray-600 mb-4 mt-6 translate-y-[4px] text-xl">
                    Doubly Circular Linked List
                </span>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <div className="h-6 rounded bg-yellow-500 p-1">Tail Node</div>
                    <div className="h-6 rounded bg-blue-500 p-1">Head Node</div>
                    <div className='h-6 rounded bg-green-500 p-1'>Middle Nodes</div>
                </div>
            </div>

            <LinkedlistQuiz />
        </div>
    );
}
export default CircularLL