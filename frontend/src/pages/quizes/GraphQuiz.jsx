const quizData = [
  {
    question: "What is the maximum number of edges in a simple undirected graph with 'n' vertices?",
    options: ["n(n-1)", "n^2", "n(n-1)/2", "2n"],
    answer: "n(n-1)/2"
  },
  {
    question: "Which data structure is typically used to implement Breadth-First Search (BFS) of a graph?",
    options: ["Stack", "Queue", "Priority Queue", "Hash Table"],
    answer: "Queue"
  },
  {
    question: "What is the time complexity of Depth-First Search (DFS) using an Adjacency List (V = vertices, E = edges)?",
    options: ["O(V^2)", "O(V + E)", "O(E^2)", "O(V * E)"],
    answer: "O(V + E)"
  },
  {
    question: "Which graph representation is more space-efficient for a 'sparse' graph?",
    options: ["Adjacency Matrix", "Adjacency List", "Incidence Matrix", "All are equal"],
    answer: "Adjacency List"
  },
  {
    question: "A graph with no cycles is known as an:",
    options: ["Directed Graph", "Complete Graph", "Acyclic Graph", "Connected Graph"],
    answer: "Acyclic Graph"
  },
  {
    question: "Dijkstra’s algorithm is used to find:",
    options: ["The Minimum Spanning Tree", "The shortest path from a source to all other vertices", "Whether a cycle exists", "The strongly connected components"],
    answer: "The shortest path from a source to all other vertices"
  },
  {
    question: "In an Adjacency Matrix representation, what does the value at matrix[i][j] usually represent?",
    options: ["The weight of the vertex", "The degree of the vertex", "The existence of an edge between vertex i and j", "The number of neighbors of vertex i"],
    answer: "The existence of an edge between vertex i and j"
  },
  {
    question: "Which algorithm is used specifically to find the Minimum Spanning Tree (MST) of a graph?",
    options: ["Bellman-Ford", "Kruskal's Algorithm", "Floyd-Warshall", "Lee Algorithm"],
    answer: "Kruskal's Algorithm"
  },
  {
    question: "What is the 'degree' of a vertex in an undirected graph?",
    options: ["The total number of vertices in the graph", "The number of edges incident to the vertex", "The length of the longest path from the vertex", "The number of cycles the vertex belongs to"],
    answer: "The number of edges incident to the vertex"
  },
  {
    question: "Topological Sorting can only be performed on which type of graph?",
    options: ["Undirected Graph", "Complete Graph", "Directed Acyclic Graph (DAG)", "Bipartite Graph"],
    answer: "Directed Acyclic Graph (DAG)"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const GraphQuiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const { user } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [quizClose, setQuizClose] = useState(true);

  const handleOptionClick = (questionIndex, option) => {
    if (submitted) return; // prevent changes after submission

    const correct = quizData[questionIndex].answer === option;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: { selected: option, correct }
    }));

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const addTopic = async () => {
    try {
      const topicName = 'Graphs';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Graphs Completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Some error occured');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (score >= 7) {
      addTopic();
    } else {
      toast.error('Correctly answer at least 7 questions to mark as completed');
    }
    setResult(`Quiz completed. You scored ${score}/${quizData.length}`)
  };

  const refresh = () => {
    setSelectedAnswers([]);
    setScore(0);
    setSubmitted(false)
    setResult("");
  }

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4">
      {quizClose ?
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h3 className='text-xl font-semibold mx-auto'>Graph Quiz</h3>
          <p className='mt-4'>This quiz consists of 10 multiple-choice questions designed to assess your understanding of graphs, including their representations, algorithms, and common use cases. To successfully complete the quiz and mark the topic as completed, you need to answer at least 7 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Graphs</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of graphs</p>
          {quizData.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold">
                {index + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-2">
                {q.options.map((option, i) => {
                  const selected = selectedAnswers[index]?.selected === option;
                  const correct = selectedAnswers[index]?.correct;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(index, option)}
                      className={`block w-full text-left px-4 py-2 rounded border ${selected
                          ? correct
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'bg-gray-50 border-gray-300'
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {selectedAnswers[index] && (
                <div className="mt-2">
                  {selectedAnswers[index].correct ? (
                    <p className="text-green-600 font-medium">
                      ✔ You answered correct
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium">
                      ✘ You answered wrong. Correct answer: {q.answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6">
            <p className="font-semibold">Score: {score} / {quizData.length}</p>
            <button
              onClick={handleSubmit}
              className="mt-4 p-2 md:px-6 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Quiz
            </button>
            <div className='text-lg font-semibold mt-1'>{result}</div>
            <div className='flex gap-2'>
            <button onClick={refresh} className='mt-4 p-2 md:px-6 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Reattempt</button>
            <button onClick={() => setQuizClose(true)} className='mt-4 p-2 md:px-6 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Close Quiz</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default GraphQuiz