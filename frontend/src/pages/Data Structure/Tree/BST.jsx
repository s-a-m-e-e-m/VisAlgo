import React, { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import TreeQuiz from "../../quizes/TreeQuiz";
import TreeNavigation from "./TreeNavigation";

const createNode = (value) => ({
    id: cryptoRandomId(),
    value,
    left: null,
    right: null,
});

function cryptoRandomId() {
    return Math.random().toString(36).slice(2) + "-" + Math.random().toString(36).slice(2);
}

const insertNode = (node, value) => {
    if (!node) return createNode(value);
    if (value < node.value) {
        return { ...node, left: insertNode(node.left, value) };
    } else if (value > node.value) {
        return { ...node, right: insertNode(node.right, value) };
    }
    return node; // ignore duplicates
};

const findMin = (node) => {
    while (node.left) node = node.left;
    return node;
};

const deleteNode = (node, value) => {
    if (!node) return null;
    if (value < node.value) {
        return { ...node, left: deleteNode(node.left, value) };
    } else if (value > node.value) {
        return { ...node, right: deleteNode(node.right, value) };
    } else {
        // found
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        const successor = findMin(node.right);
        return {
            ...node,
            value: successor.value,
            right: deleteNode(node.right, successor.value),
        };
    }
};

const layoutTree = (node, depth = 0, x = 0, offsetX = 240, yStep = 100) => {
    if (!node) return [];

    const y = depth * yStep + 60;
    const here = { id: node.id, value: node.value, x, y, left: node.left, right: node.right };

    const nextOffset = Math.max(80, offsetX * 0.6); // shrink but clamp to 80
    const leftNodes = layoutTree(node.left, depth + 1, x - nextOffset, nextOffset, yStep);
    const rightNodes = layoutTree(node.right, depth + 1, x + nextOffset, nextOffset, yStep);

    return [here, ...leftNodes, ...rightNodes];
};

// Edges from positioned nodes (parent -> child lines)
const computeEdges = (nodes) => {
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const edges = [];
    for (const n of nodes) {
        if (n.left && byId.has(n.left.id)) {
            const c = byId.get(n.left.id);
            edges.push({ from: n.id, to: c.id, x1: n.x, y1: n.y, x2: c.x, y2: c.y });
        }
        if (n.right && byId.has(n.right.id)) {
            const c = byId.get(n.right.id);
            edges.push({ from: n.id, to: c.id, x1: n.x, y1: n.y, x2: c.x, y2: c.y });
        }
    }
    return edges;
};

const BSTVisualizer = () => {
    const [root, setRoot] = useState(null);
    const [input, setInput] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    // Highlight state
    const [activeNodeId, setActiveNodeId] = useState(null);
    const [activeEdgeId, setActiveEdgeId] = useState(null); // `${fromId}->${toId}`
    const [highlightMode, setHighlightMode] = useState(null); // "insert" | "delete" | "find" | null

    // cached positions
    const nodes = useMemo(() => (root ? layoutTree(root) : []), [root]);
    const edges = useMemo(() => computeEdges(nodes), [nodes]);

    // helpers
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Animate traversal path to a target value (for insert/find/delete)
    const animatePathToValue = async (value, mode) => {
        if (!root) return;
        setHighlightMode(mode);
        setIsAnimating(true);

        // Build path from root to insertion/deletion/find point
        let cur = root;
        let prev = null;
        while (cur) {
            setActiveNodeId(cur.id);
            if (prev) setActiveEdgeId(`${prev.id}->${cur.id}`);
            await sleep(600);

            if (value === cur.value) break;
            prev = cur;
            cur = value < cur.value ? cur.left : cur.right;
        }

        setActiveNodeId(null);
        setActiveEdgeId(null);
        setHighlightMode(null);
        setIsAnimating(false);
    };

    // Actions
    const handleInsert = async () => {
        const val = parseInt(input);
        if (!Number.isInteger(val) || isAnimating) return;
        if (!root) {
            setHighlightMode("insert");
            setRoot(createNode(val));
            await sleep(300);
            setHighlightMode(null);
            setInput("");
            return;
        }
        await animatePathToValue(val, "insert");
        setRoot((prev) => insertNode(prev, val));
        setInput("");
    };

    const handleDelete = async () => {
        const val = parseInt(input);
        if (!Number.isInteger(val) || isAnimating || !root) return;
        await animatePathToValue(val, "delete");
        setRoot((prev) => deleteNode(prev, val));
        setInput("");
    };

    const handleFind = async () => {
        const val = parseInt(input);
        if (!Number.isInteger(val) || isAnimating || !root) return;
        await animatePathToValue(val, "find");
        setInput("");
    };

    const handleClear = () => {
        if (isAnimating) return;
        setRoot(null);
        setActiveNodeId(null);
        setActiveEdgeId(null);
        setHighlightMode(null);
    };

    const colors = {
        nodeDefault: "#60a5fa",
        edgeDefault: "#6b7280", 
        insert: "#facc15", 
        delete: "#ef4444", 
        find: "#9ca3af", 
    };

    const currentColor =
        highlightMode === "insert"
            ? colors.insert
            : highlightMode === "delete"
                ? colors.delete
                : highlightMode === "find"
                    ? colors.find
                    : colors.nodeDefault;

    // SVG viewport: compute widths/heights and clamp container height
    const viewWidth = 1000;
    const minHeight = 200; // base height when empty
    const levelSpacing = 120; // vertical spacing per level
    const dynamicHeight = nodes.length === 0 ? minHeight : minHeight + Math.ceil(nodes.length / 2) * levelSpacing;
    const containerHeight = Math.min(dynamicHeight, 600);

    // compute required svg width from node positions
    let svgViewMinX = -viewWidth / 2;
    let requiredSvgWidth = viewWidth;
    if (nodes.length > 0) {
        const xs = nodes.map((n) => n.x);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const margin = 120;
        requiredSvgWidth = Math.max(viewWidth, maxX - minX + margin * 2);
        svgViewMinX = minX - margin;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <TreeNavigation />
            <h1 className="font-bold text-3xl text-center mb-4 mt-4">Binary Search Tree</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Binary Search Tree?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Binary Search Tree (BST)</strong> is a specialized binary tree in which each node follows the
                    <em>ordering property</em>: the left child contains values smaller than the parent, and the right child
                    contains values greater than the parent. This property makes BSTs efficient for searching, insertion,
                    and deletion operations.
                </p>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li>Each node has at most two children: left and right.</li>
                    <li>Values in the left subtree are smaller than the parent node.</li>
                    <li>Values in the right subtree are larger than the parent node.</li>
                    <li>Inorder traversal of a BST always produces a sorted sequence.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🔹 Operations</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li><strong>Insertion:</strong> Place the new value in the correct position based on ordering property.</li>
                    <li><strong>Deletion:</strong> Remove a node and restructure the tree (cases: leaf, one child, two children).</li>
                    <li><strong>Search:</strong> Traverse left or right depending on comparison with the current node.</li>
                    <li><strong>Traversal:</strong> Preorder, Inorder, Postorder, and Level Order.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li>Insertion: <code>O(log n)</code> average, <code>O(n)</code> worst-case (unbalanced tree).</li>
                    <li>Deletion: <code>O(log n)</code> average, <code>O(n)</code> worst-case.</li>
                    <li>Search: <code>O(log n)</code> average, <code>O(n)</code> worst-case.</li>
                    <li>Traversal: <code>O(n)</code>.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🌳 Applications</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700">
                    <li>Efficient searching and sorting.</li>
                    <li>Symbol tables and dictionaries.</li>
                    <li>Database indexing.</li>
                    <li>Range queries and ordered data storage.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Binary Search Tree Visualizer</h2>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter node's value"
                    className="border border-gray-400 rounded-md p-2"
                />
                <button
                    onClick={handleInsert}
                    disabled={isAnimating}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-md text-lg disabled:opacity-50 cursor-pointer">
                    Insert
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isAnimating}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-lg disabled:opacity-50 cursor-pointer">
                    Delete
                </button>
                <button
                    onClick={handleFind}
                    disabled={isAnimating}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md text-lg disabled:opacity-50 cursor-pointer">
                    Find
                </button>
                <button
                    onClick={handleClear}
                    disabled={isAnimating}
                    className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-md text-lg disabled:opacity-50 cursor-pointer"
                >
                    Clear
                </button>
            </div>

            {/* Visualization */}
            <div className="w-full border rounded bg-white overflow-x-auto overflow-y-auto" style={{ height: containerHeight + "px" }}>
                <svg
                    viewBox={[svgViewMinX, 0, requiredSvgWidth, dynamicHeight].join(" ")}
                    style={{ width: requiredSvgWidth + "px", height: dynamicHeight + "px" }}
                >
                    {/* Edges */}
                    {edges.map((e) => {
                        const isActive = activeEdgeId === `${e.from}->${e.to}`;
                        const stroke = isActive ? currentColor : colors.edgeDefault;
                        const midX = (e.x1 + e.x2) / 2;
                        const midY = (e.y1 + e.y2) / 2;

                        return (
                            <g key={`${e.from}->${e.to}`}>
                                <line
                                    x1={e.x1}
                                    y1={e.y1}
                                    x2={e.x2}
                                    y2={e.y2}
                                    stroke={stroke}
                                    strokeWidth={isActive ? 3 : 2}
                                />
                                <text
                                    x={midX}
                                    y={midY - 6}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#374151"
                                >
                                    {e.side}
                                </text>
                            </g>
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((n) => {
                        const isActive = activeNodeId === n.id;
                        const fill = isActive ? currentColor : colors.nodeDefault;
                        return (
                            <g key={n.id}>
                                <circle
                                    cx={n.x}
                                    cy={n.y}
                                    r={22}
                                    fill={fill}
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                />
                                <text
                                    x={n.x}
                                    y={n.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontWeight="bold"
                                    fontSize="12"
                                    fill="#ffffff"
                                >
                                    {String(n.value).padStart(2, "0")}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="text-md text-gray-600 mt-2 mb-8">
                Highlights: insert (yellow), delete (red), find (grey).
            </div>

            <TreeQuiz />
        </div>
    );
};

export default BSTVisualizer;