import React, { useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import QueueQuiz from "../../quizes/QueueQuiz";
import toast, { Toaster } from "react-hot-toast";
import QueueNavigation from "./QueueNavigation";

const DoubleEndedQueue = () => {
    const [value, setValue] = useState("");
    const [queue, setQueue] = useState([]);
    const [frontPeek, setFrontPeek] = useState("");
    const [rearPeek, setRearPeek] = useState("");

    const handleInsertAtRear = () => {
        if (value === "") {
            toast.error("Please enter a value before inserting at rear.");
            return;
        }
        setQueue((prev) => [...prev, value]);
        setValue("");
        setFrontPeek("");
        setRearPeek("");
    };

    const handleInsertAtFront = () => {
        if (value === "") {
            toast.error("Please enter a value before inserting at front.");
            return;
        }
        setQueue((prev) => [value, ...prev]);
        setValue("");
        setFrontPeek("");
        setRearPeek("");
    };

    const handleRemoveAtFront = () => {
        if (queue.length === 0) {
            toast.error("Deque is empty! Nothing to remove from front.");
            return;
        }
        const val = queue[0];
        setQueue((prev) => prev.slice(1));
        setFrontPeek("");
        setRearPeek("");
    };

    const handleRemoveAtRear = () => {
        if (queue.length === 0) {
            toast.error("Deque is empty! Nothing to remove from rear.");
            return;
        }
        const val = queue[queue.length - 1];
        setQueue((prev) => prev.slice(0, -1));
        setFrontPeek("");
        setRearPeek("");
    };

    const handlePeekFront = () => {
        if (queue.length === 0) {
            setFrontPeek("Deque is empty. Nothing to peek at front.");
            return;
        }
        const val = queue[0];
        setFrontPeek(`Front Peek is ${val}`);
    }
    const handlePeekRear = () => {
        if (queue.length === 0) {
            setRearPeek("Deque is empty. Nothing to peek at rear.");
            return;
        }
        const val = queue[queue.length - 1];
        setRearPeek(`Rear Peek is ${val}`);
    }

    const handleClear = () => {
        if (queue.length === 0) {
            toast("Deque already empty.");
            return;
        }
        setQueue([]);
        setFrontPeek("");
        setRearPeek("");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <QueueNavigation />
            <h1 className="text-3xl text-center font-bold mt-4 mb-4">Deque</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Deque?</h2>
                <p className="text-gray-600 mb-4 text-lg">
                    A deque (double-ended queue) is a versatile, linear data structure that
                    allows insertion and deletion at both the front and rear. It can behave
                    like a queue (FIFO) or a stack (LIFO), depending on the operations used.
                </p>
                <hr className="mb-4" />
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Deque</strong> supports operations at both ends:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-2">
                    <li><strong>Insert at front:</strong> Add an element to the front.</li>
                    <li><strong>Insert at rear:</strong> Add an element to the rear.</li>
                    <li><strong>Remove from front:</strong> Delete the front element.</li>
                    <li><strong>Remove from rear:</strong> Delete the rear element.</li>
                    <li><strong>Peek front/rear:</strong> View elements without removing.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time complexity</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li>Insert at front: <code>O(1)</code></li>
                    <li>Insert at rear: <code>O(1)</code></li>
                    <li>Remove at front: <code>O(1)</code></li>
                    <li>Remove at rear: <code>O(1)</code></li>
                    <li>Search: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700">
                    <li>Sliding window problems (max/min of subarrays)</li>
                    <li>Implementing both stacks and queues</li>
                    <li>Job scheduling and buffering</li>
                    <li>Palindrome checking using two-ended access</li>
                </ul>
            </div>

            {/* Visualizer */}
            <div className="flex justify-between flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 w-full">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">
                        Deque Visualizer
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="border border-gray-400 rounded-md p-2"
                        />
                        <div className="flex flex-row gap-2">
                        <button
                            onClick={handleInsertAtFront}
                            className="bg-green-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-green-600">
                            Insert at front
                        </button>

                        <button
                            onClick={handleInsertAtRear}
                            className="bg-green-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-green-600">
                            Insert at rear
                        </button>
                        </div>
                    </div>

                    {/* Peek Buttons */}
                    <div className="flex flex-row gap-2 mb-4">
                        <button
                            onClick={handlePeekFront}
                            className="bg-gray-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-gray-600">
                            Peek front
                        </button>

                        <button
                            onClick={handlePeekRear}
                            className="bg-gray-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-gray-600">
                            Peek rear
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
                        <div className="flex flex-row gap-2">
                        <button
                            onClick={handleRemoveAtFront}
                            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-blue-600">
                            Remove from front
                        </button>

                        <button
                            onClick={handleRemoveAtRear}
                            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-blue-600">
                            Remove from rear
                        </button>
                        </div>

                        <button
                            onClick={handleClear}
                            className="bg-red-500 text-white p-2 rounded-md cursor-pointer text-lg hover:bg-red-600"
                            disabled={queue.length === 0}>
                            Clear
                        </button>
                    </div>

                    {/* Peek Results */}
                    {frontPeek && (
                        <span className="block text-gray-600 text-lg mb-1">
                            {frontPeek}
                        </span>
                    )}
                    {rearPeek && (
                        <span className="block text-gray-600 text-lg">
                            {rearPeek}
                        </span>
                    )}
                </div>

                {/* Visualizer */}
                <div className="flex flex-col sm:mt-8  ">
                    <>
                        <div className="border-2 border-black h-12 w-full md:min-w-[320px] mx-auto flex items-center bg-gray-100 overflow-x-auto mt-4">
                            {queue.map((item, index) => {
                                const isFront = index === 0;
                                const isRear = index === queue.length - 1;
                                return (
                                    <div
                                        key={index}
                                        className={`flex-1 h-full flex items-center justify-center rounded shadow mx-1 px-2 transition-transform duration-300
                    ${isFront ? "bg-blue-500 text-white" : isRear ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>

                        {queue.length > 0 && (
                            <div className="flex justify-between mt-2 px-2">
                                <div className="flex flex-col items-center">
                                    <BsArrowUp className="text-blue-600 font-semibold" />
                                    <span className="text-blue-600 font-semibold">Front</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <BsArrowUp className="text-red-600 font-semibold" />
                                    <span className="text-red-600 font-semibold">Rear</span>
                                </div>
                            </div>
                        )}
                    </>
                    <span className="text-gray-600 mx-auto text-lg">Deque</span>
                </div>
            </div>

            <QueueQuiz />
        </div>
    );
};

export default DoubleEndedQueue;