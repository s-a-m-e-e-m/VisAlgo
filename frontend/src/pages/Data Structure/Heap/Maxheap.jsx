import React, { useState, useRef, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import HeapQuiz from "../../quizes/HeapQuiz";
import HeapNaivgation from "./HeapNaivgation";

// Convert array-based heap into tree nodes
const arrayToTree = (arr, i = 0) => {
    if (i >= arr.length) return null;
    const node = {
        id: i,
        value: arr[i],
        index: i,
        left: arrayToTree(arr, 2 * i + 1),
        right: arrayToTree(arr, 2 * i + 2),
    };
    return node;
};

// Layout for visualization
const layoutTree = (node, depth = 0, x = 0, offsetX = 240, yStep = 100) => {
    if (!node) return [];
    const y = depth * yStep + 60;
    const here = { ...node, x, y };

    const nextOffset = Math.max(80, offsetX * 0.8);
    const leftNodes = layoutTree(node.left, depth + 1, x - nextOffset, nextOffset, yStep);
    const rightNodes = layoutTree(node.right, depth + 1, x + nextOffset, nextOffset, yStep);

    return [here, ...leftNodes, ...rightNodes];
};

const MaxHeap = () => {
    const [heap, setHeap] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [highlightMode, setHighlightMode] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeIndices, setActiveIndices] = useState([]);
    const containerRef = useRef(null);
    const [svgWidth, setSvgWidth] = useState(1000);
    const [error, setError] = useState("");

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            setSvgWidth(width);
        }
    }, []);

    const animatePath = async (path, mode) => {
        setIsAnimating(true);
        setHighlightMode(mode);

        for (let i = 0; i < path.length; i++) {
            setActiveIndices(path.slice(0, i + 1));
            await sleep(600);
        }

        setActiveIndices([]);
        setHighlightMode(null);
        setIsAnimating(false);
    };


    const bubbleUp = async (arr, idx) => {
        const path = [];
        while (idx > 0) {
            path.push(idx);
            const parent = Math.floor((idx - 1) / 2);

            if (arr[idx] > arr[parent]) {
                [arr[idx], arr[parent]] = [arr[parent], arr[idx]];
                idx = parent;
            } else break;
        }
        await animatePath(path, "insert");
    };


    const bubbleDown = async (arr, idx) => {
        const path = [];
        const n = arr.length;

        while (true) {
            path.push(idx);
            let largest = idx;
            let l = 2 * idx + 1;
            let r = 2 * idx + 2;

            if (l < n && arr[l] > arr[largest]) largest = l;
            if (r < n && arr[r] > arr[largest]) largest = r;

            if (largest !== idx) {
                [arr[idx], arr[largest]] = [arr[largest], arr[idx]];
                idx = largest;
            } else break;
        }
        await animatePath(path, "delete");
    };


    const insert = async () => {
        const val = parseInt(inputValue);
        if (!Number.isInteger(val) || isAnimating) return;
        if (heap.includes(val)) {
            setError("Duplicate values are not allowed");
            return;
        }
        const newHeap = [...heap, val];
        setHeap(newHeap);
        setIsAnimating(true);
        await bubbleUp(newHeap, newHeap.length - 1);
        setHeap([...newHeap]);
        setActiveIndices([]);
        setHighlightMode(null);
        setIsAnimating(false);
        setInputValue("");
    };

    const deleteRoot = async () => {
        if (heap.length === 0 || isAnimating) return;
        const newHeap = [...heap];
        newHeap[0] = newHeap[newHeap.length - 1];
        newHeap.pop();
        setHeap(newHeap);
        setIsAnimating(true);
        await bubbleDown(newHeap, 0);
        setHeap([...newHeap]);
        setActiveIndices([]);
        setHighlightMode(null);
        setIsAnimating(false);
    };

    const treeRoot = arrayToTree(heap);
    const nodes = treeRoot ? layoutTree(treeRoot) : [];
    const edges = [];
    const nodeMap = new Map(nodes.map((n) => [n.value, n]));
    for (const n of nodes) {
        if (n.left) {
            const c = nodeMap.get(n.left.value);
            edges.push({ x1: n.x, y1: n.y, x2: c.x, y2: c.y });
        }
        if (n.right) {
            const c = nodeMap.get(n.right.value);
            edges.push({ x1: n.x, y1: n.y, x2: c.x, y2: c.y });
        }
    }

    const colors = {
        default: "#60a5fa",
        insert: "#facc15",
        delete: "#ef4444",
    };

    // compute depth and dynamic height (clamp to 600)
    const getTreeDepth = (node) => {
        if (!node) return 0;
        return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
    };
    const treeDepth = getTreeDepth(treeRoot);
    const baseHeight = 200;
    const dynamicHeight = baseHeight + treeDepth * 50;
    const containerHeight = Math.min(dynamicHeight, 600);

    // compute required SVG width from node x positions so horizontal scrolling works
    let svgViewMinX = -svgWidth / 2;
    let requiredSvgWidth = svgWidth;
    if (nodes.length > 0) {
        const xs = nodes.map((n) => n.x);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const margin = 120; // left/right padding
        requiredSvgWidth = Math.max(svgWidth, maxX - minX + margin * 2);
        svgViewMinX = minX - margin;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <HeapNaivgation />

            <h1 className="font-bold text-center text-3xl mt-4 mb-4">Max Heap</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Max Heap?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Max Heap</strong> is a complete binary tree in which the value of each parent node
                    is greater than or equal to the values of its children. The largest element is always stored at the root,
                    making it efficient for priority queue operations where the maximum element is needed quickly.
                </p>
                <hr className="mb-4" />
                <h3 className="text-2xl font-semibold mt-4">⚙️ Operations</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li><strong>Insertion:</strong> Add element at the end, then “bubble up” to restore heap property.</li>
                    <li><strong>Deletion (root):</strong> Remove largest element, replace with last node, then “heapify down.”</li>
                    <li><strong>Peek:</strong> Access the maximum element at the root.</li>
                    <li><strong>Heapify:</strong> Convert an arbitrary array into a valid heap.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>It is a <em>complete binary tree</em> (all levels filled except possibly the last).</li>
                    <li>The root always contains the maximum element.</li>
                    <li>Each parent node ≥ its children.</li>
                    <li>Heap is typically stored in an array for efficient indexing.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-2 mb-1">⚙️ Heapify Algorithm (Max Heap)</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Heapify is the fundamental procedure used to maintain the heap property in a binary heap.</li>
                    <li>A Max heap is a special complete binary tree where every parent node ≥ its children.</li>
                    <li>Heapify checks a node and its children, and if the property is violated, it swaps the node with the appropriate child (smallest for Min Heap, largest for Max Heap) and continues recursively until the property is restored.</li>

                </ul>
                <h3 className="text-2xl font-semibold mb-1 mt-2">🔹 Uses</h3>
                    <p className="ml-6 text-lg">Heapify is the backbone of all heap operations:</p>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                        <li><b>Insertion:</b> After adding a new element at the end, Heapify “bubbles up” or “bubbles down” to restore order.</li>
                        <li><b>Deletion (root removal):</b> After removing the root (min or max), Heapify “bubbles down” the replacement node to maintain the heap property.</li>
                        <li><b>Build Heap:</b> Converts an arbitrary array into a valid heap by calling Heapify bottom-up on all non-leaf nodes.</li>
                        <li><b>Heap Sort:</b> Uses repeated Heapify calls to sort an array efficiently.</li>
                        <li><b>Priority Queues:</b> Ensures that the highest-priority element (min or max) is always accessible at the root.</li>
                </ul>
                <div className="bg-gray-50 p-4 rounded shadow mb-6">
                    <h2 className="text-2xl font-semibold mb-2">⚙️ Max Heapify Algorithm</h2>
                    <pre className="bg-black text-green-300 text-md p-0 md:p-3 rounded overflow-x-auto text-sm">
                        {`HEAPIFY(A, i, n):
    left  = 2 * i + 1        # index of left child
    right = 2 * i + 2        # index of right child
    largest = i              # assume current node is largest

    IF left < n AND A[left] > A[largest]:
        largest = left

    IF right < n AND A[right] > A[largest]:
        largest = right

    IF largest ≠ i:
        SWAP A[i] WITH A[largest]
        HEAPIFY(A, largest, n)   # recursively fix affected subtree

BUILD_MAX_HEAP(A, n):
    FOR i = (n / 2) - 1 DOWNTO 0:
        HEAPIFY(A, i, n)`}
                    </pre>
                    <p className="text-gray-700 text-md mt-2">
                        Heapify ensures the <strong>Max Heap property</strong> by bubbling down nodes until every parent ≥ its children.
                        Build Max Heap calls Heapify bottom‑up to convert an entire array into a valid Max Heap.
                    </p>
                </div>


                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Insertion: <code>O(log n)</code></li>
                    <li>Deletion (root): <code>O(log n)</code></li>
                    <li>Peek (max): <code>O(1)</code></li>
                    <li>Heapify: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li>Priority queues (max element retrieval).</li>
                    <li>Efficient scheduling algorithms.</li>
                    <li>Heap sort.</li>
                    <li>Graph algorithms (e.g., Prim’s and Dijkstra’s when using max priority).</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold mb-2">Max Heap Visualizer</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Controls */}
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <input
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setError("");
                    }}
                    placeholder="Enter value"
                    className="border border-gray-400 rounded-md p-2"/>
                <div className="flex gap-2">
                <button
                    onClick={insert}
                    disabled={isAnimating}
                    className="bg-green-500 text-white p-2 rounded-md text-lg hover:bg-green-600 disabled:opacity-50">
                    Insert
                </button>
                <button
                    onClick={deleteRoot}
                    disabled={isAnimating}
                    className="bg-red-500 text-white p-2 rounded-md text-lg hover:bg-red-600 disabled:opacity-50">
                    Delete Root
                </button>
                </div>
            </div>

            {/* Visualization */}
            <div
                ref={containerRef}
                style={{ width: "100%", height: containerHeight + "px" }}
                className="overflow-x-auto overflow-y-auto border rounded shadow bg-white mb-8">
                <svg
                    viewBox={[svgViewMinX, 0, requiredSvgWidth, dynamicHeight].join(" ")}
                    style={{ width: requiredSvgWidth + "px", height: dynamicHeight + "px" }}>
                    {edges.map((e, i) => (
                        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#6b7280" />
                    ))}
                    {nodes.map((n) => {
                        const isActive = activeIndices.includes(n.index);
                        const fill = isActive ? colors[highlightMode] : colors.default;
                        return (
                            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                                <circle r="20" fill={fill} stroke="#111827" strokeWidth={2} />
                                <text
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="12"
                                    fontWeight="bold"
                                >
                                    {n.value}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <HeapQuiz />
        </div>
    );
};

export default MaxHeap;