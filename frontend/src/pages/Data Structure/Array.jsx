import React from "react";
import { Toaster } from "react-hot-toast";
import ArrayQuiz from "../../pages/quizes/ArrayQuiz";

const Array = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto flex flex-col space-y-6">
            <Toaster position="top-center" />

            <h1 className="text-3xl text-center font-bold mb-4">Array</h1>

            {/* Theory  */}
            <div className="bg-gray-50 p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-2">📘 What is an Array?</h2>
                <p className="text-gray-700 text-lg mb-4">
                    An <strong>array</strong> is a fundamental data structure that stores a collection of elements
                    in contiguous memory locations. Each element is identified by an index, starting from 0 in most
                    programming languages. Arrays allow fast access to elements but have fixed size in static implementations.
                </p>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-4">
                    <li>Homogeneous: All elements are of the same data type.</li>
                    <li>Random Access: Direct access using index.</li>
                    <li>Fixed Size: Must be defined at creation (static arrays).</li>
                    <li>Compact storage with minimal overhead.</li>
                </ul>
            </div>

            {/* Operations */}
            <div className="bg-gray-50 p-6 rounded shadow space-y-6">
                <h2 className="text-2xl font-semibold mb-4">⚙️ Common Operations</h2>

                <div>
                    <h3 className="text-xl font-semibold">1. Traversal</h3>
                    <p className="text-gray-700 text-lg mb-2">
                        Accessing each element of the array sequentially.
                    </p>
                    <img
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20230302092847/C-array-traversal.png"
                        alt="Array Traversal"
                        className="rounded shadow md:w-1/2 md:h-1/2"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold">2. Insertion</h3>
                    <p className="text-gray-700 text-lg mb-2">
                        Adding a new element at a specific index.
                    </p>
                    <img
                        src="https://markaicode.com/images/Array-Insertion-Process.jpg"
                        alt="Array Insertion"
                        className="rounded shadow md:w-1/2 md:h-1/2"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold">3. Deletion</h3>
                    <p className="text-gray-700 text-lg mb-2">
                        Removing an element from a specific index.
                    </p>
                    <img
                        src="https://www.devopstrainer.in/blog/wp-content/uploads/2022/10/c_array_del-678x381.png"
                        alt="Array Deletion"
                        className="rounded shadow md:w-1/2 md:h-1/2"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold">4. Searching</h3>
                    <p className="text-gray-700 text-lg mb-2">
                        Finding the location of a given element (Linear Search or Binary Search).
                    </p>
                    <img
                        src="https://miro.medium.com/max/1400/1*ojZbTAefEkSZc8Yyok0eQQ.gif"
                        alt="Array Searching"
                        className="rounded shadow md:w-1/2 md:h-1/2"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold">5. Sorting</h3>
                    <p className="text-gray-700 text-lg mb-2">
                        Arranging elements in ascending or descending order.
                    </p>
                    <img
                        src="https://www.programiz.com/sites/tutorial2program/files/sorting.png"
                        alt="Array Sorting"
                        className="rounded shadow md:w-1/2 md:h-1/2"
                    />
                </div>
            </div>

            {/* Complexity */}
            <div className="bg-gray-50 p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-2">⏱ Time Complexity</h2>
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-black">Operation</th>
                            <th className="px-4 py-2 border border-black">Best Case</th>
                            <th className="px-4 py-2 border border-black">Worst Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Traversal</td>
                            <td className="border px-4 py-2">O(n)</td>
                            <td className="border px-4 py-2">O(n)</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Insertion</td>
                            <td className="border px-4 py-2">O(1)</td>
                            <td className="border px-4 py-2">O(n)</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Deletion</td>
                            <td className="border px-4 py-2">O(1)</td>
                            <td className="border px-4 py-2">O(n)</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Searching</td>
                            <td className="border px-4 py-2">O(1)</td>
                            <td className="border px-4 py-2">O(n)</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Sorting</td>
                            <td className="border px-4 py-2">O(n log n)</td>
                            <td className="border px-4 py-2">O(n log n)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Applications */}
            <div className="bg-gray-50 p-6 mb-8 rounded shadow">
                <h2 className="text-2xl font-semibold mb-2">💡 Applications</h2>
                <ul className="list-disc text-lg pl-6 text-gray-700">
                    <li>Storing lists of data (e.g., student grades, product prices).</li>
                    <li>Implementing other data structures like stacks, queues, and heaps.</li>
                    <li>Basis for matrix representation in 2D arrays.</li>
                    <li>Used in searching and sorting algorithms.</li>
                </ul>
            </div>

            <ArrayQuiz />
        </div>
    );
}

export default Array
