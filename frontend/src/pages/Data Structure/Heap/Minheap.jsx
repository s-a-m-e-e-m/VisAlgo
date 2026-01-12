import React, { useState, useRef, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import HeapQuiz from "../../quizes/HeapQuiz";
import HeapNaivgation from "./HeapNaivgation";

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

const MinHeap = () => {
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

            if (arr[idx] < arr[parent]) {
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

            if (l < n && arr[l] < arr[largest]) largest = l;
            if (r < n && arr[r] < arr[largest]) largest = r;

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

    const colors = {
        default: "#60a5fa",
        insert: "#facc15",
        delete: "#ef4444",
    };

    // compute depth for tree nodes (nodes have `left` and `right`)
    const getTreeDepth = (node) => {
        if (!node) return 0;
        return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
    };

    const treeDepth = getTreeDepth(treeRoot); // compute depth from the tree root
    const baseHeight = 200; // minimum height
    const dynamicHeight = baseHeight + treeDepth * 50;
    const containerHeight = Math.min(dynamicHeight, 600); // clamp to max 600px

    return (
        <div className="p-4 w-full sm:max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <HeapNaivgation />

            <h1 className="font-bold text-3xl text-center mb-4 mt-4">Min Heap</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Min Heap?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Min Heap</strong> is a complete binary tree in which the value of each parent node
                    is less than or equal to the values of its children. The smallest element is always stored at the root,
                    making it efficient for priority queue operations.
                </p>
                <hr className="mb-4" />
                <h3 className="text-2xl font-semibold mt-4">⚙️ Operations</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li><strong>Insertion:</strong> Add element at the end, then “bubble up” to restore heap property.</li>
                    <li><strong>Deletion (root):</strong> Remove smallest element, replace with last node, then “heapify down.”</li>
                    <li><strong>Peek:</strong> Access the minimum element at the root.</li>
                    <li><strong>Heapify:</strong> Convert an arbitrary array into a valid heap.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>It is a <em>complete binary tree</em> (all levels filled except possibly the last).</li>
                    <li>The root always contains the minimum element.</li>
                    <li>Each parent node ≤ its children.</li>
                    <li>Heap is typically stored in an array for efficient indexing.</li>
                </ul>

                <div className="bg-gray-50 p-4 rounded shadow mb-6">
                    <h2 className="text-2xl font-semibold mb-2">⚙️ Heapify Algorithm (Min Heap)</h2>
                    <p className="ml-2 text-lg">Heapify is a fundamental procedure used to maintain the heap property in a binary heap.</p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>In a Min Heap, every parent node must be ≤ its children.</li>
                        <li>Heapify checks a node and its children, and if the property is violated, it swaps the node with the smaller child and continues recursively.</li>
                        <li>This ensures the tree remains a valid heap after insertions, deletions, or modifications.</li>
                    </ul>
                    <h3 className="text-2xl font-semibold mb-1 mt-2">🔹Uses</h3>
                    <p className="ml-2 text-lg">Heapify is the backbone of all heap operations:</p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li><b>Insertion:</b> After adding a new element at the end, Heapify “bubbles up” or “bubbles down” to restore order.</li>
                        <li><b>Deletion(root removal):</b> After removing the smallest element (root), Heapify “bubbles down” the replacement node to maintain the heap property.</li>
                        <li><b>Build Heap:</b> Converts an arbitrary array into a valid heap by calling Heapify bottom-up on all non-leaf nodes.</li>
                        <li><b>Heap Sort:</b> Uses repeated Heapify calls to sort an array efficiently.</li>
                        <li><b>Priority Queues:</b> Ensures that the highest‑priority (smallest in Min Heap) element is always accessible at the root.</li>
                    </ul>
                    <h3 className="font-semiibold text-2xl mt-2 mb-1">Pseudo Code: </h3>
                    <pre className="bg-black text-green-300 p-0 md:p-3 rounded overflow-x-auto text-sm">
                        {`Heapify(A, i):
    left  = 2 * i + 1
    right = 2 * i + 2
    smallest = i

    if left < heap_size and A[left] < A[smallest]:
        smallest = left

    if right < heap_size and A[right] < A[smallest]:
        smallest = right

    if smallest != i:
        swap(A[i], A[smallest])
        Heapify(A, smallest)`}
                    </pre>
                    <p className="text-gray-700 mt-2">
                        Heapify ensures the Min Heap property by bubbling down nodes until every parent ≤ its children.
                    </p>
                </div>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-2">
                    <li>Insertion: <code>O(log n)</code></li>
                    <li>Deletion (root): <code>O(log n)</code></li>
                    <li>Peek (min): <code>O(1)</code></li>
                    <li>Heapify: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">💡 Applications</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li>Priority queues.</li>
                    <li>Efficient scheduling algorithms.</li>
                    <li>Dijkstra's shortest path algorithm.</li>
                    <li>Heap sort.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold mb-2">Min Heap Visualizer</h2>
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
                    className="bg-green-500 text-white p-2 rounded-md text-lg hover:bg-green-600 disabled:opacity-50"
                >
                    Insert
                </button>
                <button
                    onClick={deleteRoot}
                    disabled={isAnimating}
                    className="bg-red-500 text-white p-2 rounded-md text-lg hover:bg-red-600 disabled:opacity-50"
                >
                    Delete Root
                </button>
                </div>
            </div>

            {/* Visualization */}
            <div
                ref={containerRef}
                style={{ width: "100%", height: containerHeight + "px" }}
                className="w-full border rounded bg-white overflow-x-auto overflow-y-auto md:overflow-scroll mb-8">
                <svg
                    viewBox={[svgViewMinX, 0, requiredSvgWidth, dynamicHeight].join(" ")}
                    style={{ width: requiredSvgWidth + "px", height: dynamicHeight + "px" }}
                >
                    {edges.map((e, i) => (
                        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#6b7280" />
                    ))}
                    {nodes.map((n) => {
                        const isActive = activeIndices.includes(n.index);
                        const fill = isActive ? colors[highlightMode] : colors.default;
                        return (
                            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                                <circle r="20" fill={fill} stroke="#ffffff" strokeWidth={2} />
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

export default MinHeap;