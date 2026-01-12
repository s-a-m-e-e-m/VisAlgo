import React, { useState, useRef, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import TreeQuiz from "../../quizes/TreeQuiz";
import TreeNavigation from "./TreeNavigation";

const createNode = (value) => ({
    id: Date.now() + Math.random(),
    name: value,
    children: [],
});

const addBinaryChildRecursive = (node, targetId, value) => {
    if (node.id === targetId) {
        if (node.children.length >= 2) return node;
        return { ...node, children: [...node.children, createNode(value)] };
    }
    return {
        ...node,
        children: node.children.map((child) =>
            addBinaryChildRecursive(child, targetId, value)
        ),
    };
};

const layoutTree = (node, depth = 0, x = 0, offset = 240, yStep = 100) => {
    if (!node) return [];
    const y = depth * yStep + 60;
    const here = { ...node, x, y };

    const nextOffset = Math.max(80, offset * 0.8);
    const left = node.children[0]
        ? layoutTree(node.children[0], depth + 1, x - nextOffset, nextOffset, yStep)
        : [];
    const right = node.children[1]
        ? layoutTree(node.children[1], depth + 1, x + nextOffset, nextOffset, yStep)
        : [];

    return [here, ...left, ...right];
};

const TreeVisualizer = () => {
    const [treeData, setTreeData] = useState(null);
    const [nodeValue, setNodeValue] = useState("");
    const containerRef = useRef(null);
    const [svgWidth, setSvgWidth] = useState(1000);

    useEffect(() => {
        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            setSvgWidth(width);
        }
    }, []);

    const getTreeDepth = (node) => {
        if (!node) return 0;
        if (!node.children || node.children.length === 0) return 1;
        return 1 + Math.max(...node.children.map(getTreeDepth));
    };

    const treeDepth = getTreeDepth(treeData); // write a helper to compute depth
    const baseHeight = 200; // minimum height
    const dynamicHeight = baseHeight + treeDepth * 70;
    const containerHeight = Math.min(dynamicHeight, 1000);

    // svg width calculation moved below after `nodes` is initialized

    const addRoot = () => {
        if (!nodeValue) return;
        setTreeData(createNode(nodeValue));
        setNodeValue("");
    };

    const addChild = (targetId) => {
        if (!nodeValue) return;
        setTreeData((prev) => addBinaryChildRecursive(prev, targetId, nodeValue));
        setNodeValue("");
    };

    const nodes = treeData ? layoutTree(treeData) : [];
    const edges = [];
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    for (const node of nodes) {
        node.children.forEach((child) => {
            const childNode = nodeMap.get(child.id);
            if (childNode) {
                edges.push({
                    x1: node.x,
                    y1: node.y,
                    x2: childNode.x,
                    y2: childNode.y,
                });
            }
        });
    }

    // compute required SVG width from node x positions
    let svgViewMinX = -svgWidth / 2;
    let requiredSvgWidth = svgWidth;
    if (nodes.length > 0) {
        const xs = nodes.map((n) => n.x);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const margin = 120;
        requiredSvgWidth = Math.max(svgWidth, maxX - minX + margin * 2);
        svgViewMinX = minX - margin;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Toaster position="top-center" />
            <TreeNavigation />
            <h1 className="font-bold text-3xl text-center mb-4 mt-4">Binary Tree</h1>

            {/* Theory Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-2">📘 What is Binary Tree?</h2>
                <p className="text-gray-700 text-lg mb-2">
                    A <strong>Binary Tree</strong> is a hierarchical data structure in which each node has at most two children,
                    referred to as the <em>left child</em> and the <em>right child</em>. It is one of the most fundamental tree
                    structures used in computer science.
                </p>

                <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li>Each node contains <code>data</code>, a pointer to the left child, and a pointer to the right child.</li>
                    <li>The root node is the topmost node with no parent.</li>
                    <li>Nodes with no children are called <em>leaf nodes</em>.</li>
                    <li>The height of a binary tree is the longest path from root to a leaf.</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🔹 Traversal Methods</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li><strong>Preorder: </strong>Root → Left → Right</li>
                    <li><strong>Inorder: </strong>Left → Root → Right</li>
                    <li><strong>Postorder: </strong>Left → Right → Root</li>
                    <li><strong>Level Order: </strong>Breadth-First Search</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
                    <li>Insertion: <code>O(log n)</code> (balanced), worst-case <code>O(n)</code></li>
                    <li>Deletion: <code>O(log n)</code> (balanced), worst-case <code>O(n)</code></li>
                    <li>Traversal/Search: <code>O(n)</code></li>
                </ul>

                <h3 className="text-2xl font-semibold mt-4">🌳 Types of Binary Trees</h3>
                <ul className="list-disc text-lg pl-6 text-gray-700">
                    <li><strong>Full Binary Tree:</strong> Every node has 0 or 2 children.</li>
                    <li><strong>Complete Binary Tree:</strong> All levels are filled except possibly the last, filled left to right.</li>
                    <li><strong>Perfect Binary Tree:</strong> All internal nodes have 2 children and all leaves are at the same level.</li>
                    <li><strong>Balanced Binary Tree:</strong> Height difference between left and right subtrees is minimal.</li>
                    <li><strong>Binary Search Tree (BST):</strong> Left child less than root and right child greater than root.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Binary Tree Visualizer</h2>
            {/* Input and root insert */}
            <div className="mb-4 w-full mx-auto">
                <input
                    value={nodeValue}
                    onChange={(e) => setNodeValue(e.target.value)}
                    placeholder="Enter root value"
                    className="border border-gray-400 rounded-md p-2 mr-2"
                />
                {!treeData ? (
                    <button
                        onClick={addRoot}
                        className="p-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 cursor-pointer">
                        Insert Root
                    </button>
                ) : (<div> <br /> <span className="text-gray-600 text-md">Click on the nodes to add respective node's children. You can't add more than two children since it is a binary tree.</span></div>)}
            </div>

            {/* Tree SVG */}
            <div ref={containerRef} style={{ width: "100%", height: containerHeight + "px" }} className="w-full border rounded bg-white overflow-x-auto overflow-y-auto mb-8">
                <svg
                    viewBox={[svgViewMinX, 0, requiredSvgWidth, dynamicHeight].join(" ")}
                    style={{ width: requiredSvgWidth + "px", height: dynamicHeight + "px" }}
                >
                    {/* Edges */}
                    {edges.map((e, i) => (
                        <line
                            key={i}
                            x1={e.x1}
                            y1={e.y1}
                            x2={e.x2}
                            y2={e.y2}
                            stroke="#6b7280"
                            strokeWidth={2}
                        />
                    ))}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g
                            key={node.id}
                            transform={`translate(${node.x},${node.y})`}
                            className="group cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); addChild(node.id); }}
                            onTouchStart={(e) => { e.stopPropagation(); addChild(node.id); }}
                        >
                            <circle r="20" fill="#60a5fa" />
                            <text
                                fill="white"
                                x="0"
                                y="5"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                {node.name}
                            </text>

                            {/* Add child button */}
                            {/* Clicking/tapping the node itself adds a child (if < 2) */}
                        </g>
                    ))}
                </svg>
            </div>

            <TreeQuiz />
        </div>
    );
};

export default TreeVisualizer;