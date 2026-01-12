import React, { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import { Toaster } from "react-hot-toast";
import TreeQuiz from "../../quizes/TreeQuiz";
import TreeNavigation from "./TreeNavigation";

const TreeVisualizer = () => {
  const [treeData, setTreeData] = useState(null);
  const [nodeValue, setNodeValue] = useState("");
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const createNode = (name) => ({
    id: Date.now() + Math.random(), // unique
    name,
    children: [],
  });

  const addChildRecursive = (node, targetId, childName) => {
    if (node.id === targetId) {
      return {
        ...node,
        children: [...node.children, createNode(childName)],
      };
    }
    return {
      ...node,
      children: node.children.map((c) =>
        addChildRecursive(c, targetId, childName)
      ),
    };
  };

  // center tree
  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 50 });
    }
  }, []);

  const addRoot = () => {
    if (!nodeValue) return;
    setTreeData(createNode(nodeValue));
    setNodeValue("");
  };

  const addChild = (targetId) => {
    if (!nodeValue) return;
    setTreeData((prev) =>
      addChildRecursive(prev, targetId, nodeValue)
    );
    setNodeValue("");
  };

  const renderNode = ({ nodeDatum }) => (
    <g
      className="group cursor-pointer"
      onClick={() => addChild(nodeDatum.id)}
      onTouchStart={() => addChild(nodeDatum.id)}
    >
      <circle r="20" fill="#60a5fa" />
      <text fill="white" x="-5" y="5">
        {nodeDatum.name}
      </text>
    </g>
  );

  const getTreeDepth = (node) => {
        if (!node) return 0;
        if (!node.children || node.children.length === 0) return 1;
        return 1 + Math.max(...node.children.map(getTreeDepth));
    };

    const treeDepth = getTreeDepth(treeData); 
    const baseHeight = 200; 
    const dynamicHeight = baseHeight + treeDepth * 70;
    const containerHeight = Math.min(dynamicHeight, 1000);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Toaster position="top-center" />
      <TreeNavigation />
      <h1 className="font-bold text-center text-3xl mb-4 mt-4">Tree</h1>

      {/* Theory Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">📘 What is Tree?</h2>
        <p className="text-gray-700 text-lg mb-2">
          A <strong>tree</strong> is a <strong>hierarchical</strong> data structure used to organize and represent data in a <strong>parent-child</strong> relationship.
          It consists of nodes, where the topmost node is called the <strong>root</strong>, and every other node can have one or more <strong>child nodes</strong>.
        </p>

        <h3 className="text-2xl font-semibold mt-4">🔹 Characteristics</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li><strong>Node structure:</strong> Each node stores data and a list/array of children.</li>
          <li><strong>Root:</strong> The topmost node with no parent; subtrees exist beneath each child.</li>
          <li><strong>Order:</strong> Children may be ordered (e.g., indexed) or unordered depending on use case.</li>
          <li><strong>Generality:</strong> Binary trees are a special case of n-ary trees.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🔹 Operations</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li><strong>Insertion:</strong> Add a child to a specified parent node.</li>
          <li><strong>Deletion:</strong> Remove a node and its entire subtree.</li>
          <li><strong>Search:</strong> Find a node by value or predicate.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🔹 Traversal</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li><strong>Depth-first search (DFS):</strong> Visit a node, then recursively visit each of its children (common variants include pre-order-style DFS and post-order-style DFS for n-ary trees).</li>
          <li><strong>Breadth-first search (BFS):</strong> Level-by-level traversal using a queue.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">⏱ Time Complexity</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700 mb-2">
          <li><strong>Insertion:</strong> O(1) if parent reference is known; O(n) if searching for parent.</li>
          <li><strong>Deletion:</strong> O(k) for subtree size (worst-case O(n)).</li>
          <li><strong>Traversal/Search:</strong> O(n) over all nodes.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-4">🌳 Common tree types</h3>
        <ul className="list-disc text-lg pl-6 text-gray-700">
          <li><strong>General (n-ary) tree:</strong> Arbitrary number of children per node.</li>
          <li><strong>Binary tree:</strong> Up to two children per node.</li>
          <li><strong>Binary search tree (BST):</strong> Ordered binary tree with efficient search.</li>
          <li><strong>AVL/Red-Black trees:</strong> Self-balancing BSTs.</li>
          <li><strong>Heaps (min/max):</strong> Priority structures with heap-order property.</li>
          <li><strong>Trie (prefix tree):</strong> Efficient string/key storage by prefixes.</li>
          <li><strong>B-tree/B+ tree:</strong> Multi-way balanced trees for databases/filesystems.</li>
          <li><strong>Segment/Fenwick trees:</strong> Range query/update structures.</li>
          <li><strong>Suffix tree/array:</strong> String pattern indexing.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Tree Visualizer</h2>
        <input
          value={nodeValue}
          onChange={(e) => setNodeValue(e.target.value)}
          placeholder="Enter node value"
          className="border border-gray-400 rounded-md p-2 mr-2"
        />
        {!treeData ? (
          <button
            onClick={addRoot}
            className="p-2 cursor-pointer bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
          >
            Insert Root
          </button>
        ) : (<div><br />
        <span className="text-gray-600 text-md">Click on the nodes to add respective node's children</span></div>)}

      </div>

      {/* Visualization */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: containerHeight + "px" }}
        className="w-full mb-8 border rounded shadow bg-white overflow-x-auto overflow-y-auto"
      >
        {treeData && (
          <Tree
            data={treeData}
            translate={translate}
            orientation="vertical"
            pathFunc="elbow"
            renderCustomNodeElement={renderNode}
            zoomable
            collapsible={false}
          />
        )}
      </div>
      <TreeQuiz />
    </div>
  );
};

export default TreeVisualizer;