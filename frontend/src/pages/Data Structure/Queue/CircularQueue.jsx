import { useState } from "react";
import QueueQuiz from "../../quizes/QueueQuiz";
import toast, { Toaster } from "react-hot-toast";
import QueueNavigation from "./QueueNavigation";

const CircularQueue = () => {
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
            toast.error("Circular queue is empty! Nothing to dequeue.");
            return;
        }
        const val = queue[0];
        setQueue((prev) => prev.slice(1));
        setPeek("");
    };

    const handlePeek = () => {
        if(queue.length===0){
            setPeek('Circular Queue is empty. Nothing to peek.');
            return;
        }   
        const val = queue[0];
        setPeek(`Peek is ${val}`);
    }

    const handleClear = () => {
        if (queue.length === 0) {
            toast("Queue already empty.");
            return;
        }
        setQueue([]);
        setPeek("");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <QueueNavigation />
            <h1 className="text-3xl text-center font-bold mb-4 mt-4">Circular Queue</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Circular Queue?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Circular Queue</strong> (or Ring Buffer) is a linear data
                    structure where the last position connects back to the first, forming
                    a circle. Unlike a normal queue, it efficiently utilizes space by
                    reusing freed slots.
                </p>
                <hr className="mb-4" />
                <h3 className="text-2xl font-semibold mb-2">⚙️ Circular Queue Operations</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li><strong>Enqueue:</strong> Insert element at the rear.</li>
                    <li><strong>Dequeue:</strong> Remove element from the front.</li>
                    <li><strong>Peek:</strong> View front element without removing.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Enqueue: <code>O(1)</code></li>
                    <li>Dequeue: <code>O(1)</code></li>
                    <li>Peek: <code>O(1)</code></li>
                    <li>Search: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li>Memory management (buffer handling)</li>
                    <li>Traffic systems (round-robin scheduling)</li>
                    <li>CPU scheduling (time slicing)</li>
                    <li>Streaming data (audio/video buffers)</li>
                </ul>
            </div>

            {/* Visualizer */}
            <div className="flex justify-between flex-col md:flex-row mb-8 gap-6">
                {/* Controls */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Circular Queue Visualizer</h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="border border-gray-400 rounded-md p-2"
                        />
                        <button
                            onClick={handleEnqueue} className="cursor-pointer bg-green-500 text-white p-2 rounded-md text-lg hover:bg-green-600">
                            Enqueue
                        </button>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={handleDequeue} className="cursor-pointer bg-blue-500 text-white p-2 rounded-md text-lg hover:bg-blue-600">
                            Dequeue
                        </button>
                        <button
                            onClick={handleClear} className="cursor-pointer bg-red-500 text-white p-2 rounded-md text-lg hover:bg-red-600"
                            disabled={!queue || queue.length === 0}>
                            Clear
                        </button>
                        <button onClick={handlePeek} className="cursor-pointer bg-gray-500 hover:bg-gray-600 p-2 text-lg text-white rounded-md">Peek</button>
                    </div>

                    {peek.length > 0 && (
                        <div className>
                            <span className="block text-lg text-gray-600">{peek}</span>
                        </div>
                    )}
                </div>

                {/* Circular Queue Visualizer */}
                <div className="flex-1">
                    <div className="relative w-80 h-80 mx-auto mt-6 rounded-full border-4 border-black flex items-center justify-center bg-gray-100">
                        {queue.map((item, index) => {
                            const angle = (360 / queue.length) * index;
                            const isFront = index === 0;
                            const isRear = index === queue.length - 1;

                            return (
                                <div
                                    key={index}
                                    className={`absolute w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition-transform duration-300
                    ${isFront ? "bg-blue-500" : isRear ? "bg-red-500" : "bg-green-600"}`}
                                    style={{
                                        transform: `
                      rotate(${angle}deg)
                      translate(140px)
                      rotate(-${angle}deg)
                    `,
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}

                        {/* Center label */}
                        <span className="absolute text-md font-semibold text-gray-700">
                            Circular Queue
                        </span>
                    </div>
                </div>
            </div>

            <QueueQuiz />
        </div>
    );
};

export default CircularQueue;