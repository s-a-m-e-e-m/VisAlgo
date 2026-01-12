import { useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import QueueQuiz from "../../quizes/QueueQuiz";
import toast, { Toaster } from "react-hot-toast";
import QueueNavigation from "./QueueNavigation";

const Queue = () => {
    const [value, setValue] = useState("");
    const [queue, setQueue] = useState([]);
    const [peek, setPeek] = useState("");

    const handleEnqueue = () => {
        if (value === "") {
            toast.error("Please enter a value before enqueueing!");
            return;
        }
        setQueue((prev) => [...prev, value]);
        setValue("");
        setPeek("");
    };

    const handleDequeue = () => {
        if (queue.length === 0) {
            toast.error("Queue is empty! Nothing to dequeue.");
            return;
        }
        setQueue((prev) => prev.slice(1));
        setPeek("");
    };

    const handlePeek = () => {
        if(queue.length===0){
            setPeek('Queue is empty. Nothing to peek.');
            return;
        }
        const val = queue[0];
        setPeek(`Peek is ${val}`);
    }

    const handleClear = () => {
        setQueue([]);
        setPeek("");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <QueueNavigation />
            <h1 className="text-3xl text-center font-bold mt-4 mb-4">Queue</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-1">📘 What is Queue?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A queue is a linear data structure that follows the{" "}
                    <strong>FIFO (First In, First Out)</strong> principle. The first
                    element added is the first one to be removed.
                </p>
                <hr className="mb-4" />
                <h3 className="text-2xl font-semibold mb-1">⚙️ Queue Operations</h3>
                <ul className="list-disc pl-6 text-gray-700 text-lg mb-2">
                    <li>
                        <strong>Enqueue:</strong> Insert an element at the rear.
                    </li>
                    <li>
                        <strong>Dequeue:</strong> Remove the element from the front.
                    </li>
                    <li>
                        <strong>Peek:</strong> View the front element without removing it.
                    </li>
                </ul>

                <h3 className="text-2xl font-semibold ">⏱ Time Complexity</h3>
                <ul className="list-disc pl-6 text-gray-700 text-lg mb-2">
                    <li>Enqueue: <code>O(1)</code></li>
                    <li>Dequeue: <code>O(1)</code></li>
                    <li>Peek: <code>O(1)</code></li>
                    <li>Search: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold ">💡 Applications</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li>Task scheduling (CPU scheduling, printers)</li>
                    <li>Order processing systems</li>
                    <li>BFS (Breadth-First Search) in graphs</li>
                    <li>Handling requests in web servers</li>
                </ul>
            </div>

            {/* Controls */}
            <div className="flex justify-between flex-col md:flex-row mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Queue Visualizer</h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="border border-gray-400 rounded-md p-2"
                        />
                        <button
                            onClick={handleEnqueue}
                            className="cursor-pointer bg-green-500 text-white p-2 rounded-md text-lg hover:bg-green-600"
                        >
                            Enqueue
                        </button>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={handleDequeue}
                            className="cursor-pointer bg-blue-500 text-white p-2 rounded-md text-lg hover:bg-blue-600"
                        >
                            Dequeue
                        </button>
                        <button
                            onClick={handleClear}
                            className="cursor-pointer bg-red-500 text-white p-2 rounded-md text-lg hover:bg-red-600"
                            disabled={!queue || queue.length === 0}
                        >
                            Clear
                        </button>
                        <button
                            onClick={handlePeek}
                            className="cursor-pointer bg-red-500 text-white p-2 rounded-md text-lg hover:bg-red-600"
                            disabled={!queue || queue.length === 0}
                        >
                            Peek
                        </button>
                    </div>

                    {peek.length>0 && <span className="text-lg">{peek}</span>}
                </div>

                {/* Queue Visualizer */}
                <div className="flex flex-col sm:mt-8  ">
                    <>
                    <div className="border-2 border-black h-12 min-w-[300px] mx-auto flex items-center bg-gray-100 overflow-x-auto mt-4">
                        {queue.map((item, index) => {
                            const isFront = index === 0;
                            const isRear = index === queue.length - 1;
                            return (
                                <div
                                    key={index}
                                    className={`flex-1 h-full flex items-center justify-center rounded shadow mx-1 p-1 transition-transform duration-300
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
                    <span className="text-center text-gray-600 mt-2 text-lg">Queue</span>
                </div>
            </div>
            <QueueQuiz />
        </div>
    );
};

export default Queue;