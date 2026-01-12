import React from "react";
import { Toaster } from "react-hot-toast";
import GraphQuiz from "../quizes/GraphQuiz";

const Graph = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-8 max-w-5xl mx-auto">
            <Toaster />
            <h1 className="text-3xl text-center font-bold mb-4">
                Graphs
            </h1>

            {/* Introduction */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">📘 What is a Graph?</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-2 mt-2">
                    A graph is a non-linear data structure consisting of nodes (vertices) and edges
                    that connect pairs of nodes. Graphs are widely used to represent networks such
                    as social connections, computer networks, and paths in maps.
                </p>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5b/6n-graf.svg"
                    alt="Graph Example"
                    className="mt-4 w-64 mx-auto"
                />
            </section>

            {/* Representation */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Graph Representation</h2>

                <h3 className="text-xl font-medium mt-6 mb-2">Adjacency List</h3>
                <p className="text-gray-700 text-lg mt-1 mb-1">
                    Each vertex stores a list of adjacent vertices. Efficient for sparse graphs.
                </p>
                <img
                    src="https://2.bp.blogspot.com/-E84bqwhejuY/Ux5EPUYap5I/AAAAAAAACLk/aIhItchwT34/s1600/Adjacency+List+Representation+of+Graph.JPG"
                    alt="Adjacency List"
                    className="mt-2 w-100 h-50 mx-auto"
                />

                <h3 className="text-xl font-medium mt-6 mb-2">Adjacency Matrix</h3>
                <p className="text-gray-700 text-lg">
                    A 2D matrix where rows and columns represent vertices, and cell values indicate
                    edge presence. Efficient for dense graphs.
                </p>
                <img
                    src="https://www.ebi.ac.uk/training/online/courses/network-analysis-of-protein-interaction-data-an-introduction/wp-content/uploads/sites/64/2020/08/new-fig-4-1024x633.png"
                    alt="Adjacency Matrix"
                    className="mt-2 w-100 h-60  mx-auto"
                />

                <h3 className="text-xl font-medium mt-6 mb-2">Incidence Matrix</h3>
                <p className="text-gray-700 text-lg">
                    A matrix where rows represent vertices and columns represent edges. Useful for
                    certain mathematical graph problems.
                </p>
                <img
                    src="https://th.bing.com/th/id/R.32c9f184d7fa508c8fb8702cf26b693e?rik=I4fqxUlWe1QB6g&riu=http%3a%2f%2fbtechsmartclass.com%2fdata_structures%2fds_images%2fGraph+Incidence+Matrix.jpg&ehk=L9u5ValJi0bTuSx83vlu5mjYA50cN41XNSgNfKi2TOo%3d&risl=&pid=ImgRaw&r=0"
                    alt="Incidence Matrix"
                    className="mt-2 w-120 h-40 mx-auto"
                />
            </section>

            {/* Traversals */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Graph Traversals</h2>

                <h3 className="text-xl font-medium mt-6 mb-2">Breadth-First Search (BFS)</h3>
                <p className="text-lg mt-2 mb-2">What is BFS? (Breadth-first Search) - DEV CommunityBreadth-First Search (BFS) is a graph traversal algorithm that explores a graph level by level, visiting all neighbors of a node before moving to the next level's nodes, using a First-In, First-Out (FIFO) queue to manage nodes and find the shortest path in unweighted graphs. It starts at a source, adds its neighbors to the queue, then processes those neighbors, adding their unvisited neighbors, and so on, ensuring it finds the closest nodes first.  </p>
                <pre className="bg-gray-900 text-md text-green-200 p-4 rounded-md overflow-x-auto">
                    {`BFS(Graph, start):
  create a queue Q
  mark start as visited
  enqueue start into Q
  while Q is not empty:
    node = dequeue Q
    for each neighbor of node:
      if neighbor not visited:
        mark neighbor visited
        enqueue neighbor`}
                </pre>

                <h3 className="text-xl font-medium mt-6 mb-2">Depth-First Search (DFS)</h3>
                <p className="text-lg mt-2 mb-2">Depth-First Search (DFS) is a graph or tree traversal algorithm that explores as far as possible along each branch before backtracking, like wandering through a maze until a dead end, then retracing steps to find another path, using a stack (often implicitly via recursion) to manage visited nodes and find unvisited neighbors. It starts at a root (or chosen) node, goes deep down one path, and when it hits a dead end or all nodes in that branch are visited, it backtracks to the last junction to explore other options until all nodes are found. </p>
                <pre className="bg-gray-900 text-md text-green-200 p-4 rounded-md overflow-x-auto">
                    {`DFS(Graph, start):
  mark start as visited
  for each neighbor of start:
    if neighbor not visited:
      DFS(Graph, neighbor)`}
                </pre>
            </section>

            <GraphQuiz />
        </div>
    );
}

export default Graph