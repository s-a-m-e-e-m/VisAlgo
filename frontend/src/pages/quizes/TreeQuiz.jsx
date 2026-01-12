const quizData = [
  // --- General Tree & Binary Tree ---
  {
    question: "What is the maximum number of children a node can have in a Binary Tree?",
    options: ["1", "2", "3", "Any number"],
    answer: "2"
  },
  {
    question: "A binary tree in which every node has either 0 or 2 children is called a:",
    options: ["Complete Binary Tree", "Perfect Binary Tree", "Full Binary Tree", "Skewed Binary Tree"],
    answer: "Full Binary Tree"
  },
  {
    question: "What is the height of an empty tree?",
    options: ["0", "-1", "1", "Infinity"],
    answer: "-1"
  },
  {
    question: "In a physical implementation of a tree, a node without any children is known as a:",
    options: ["Root node", "Internal node", "Leaf node", "Sibling node"],
    answer: "Leaf node"
  },
  {
    question: "Which traversal of a binary tree visits the nodes in the order: Left, Root, Right?",
    options: ["Pre-order", "Post-order", "In-order", "Level-order"],
    answer: "In-order"
  },
  {
    question: "What is the maximum number of nodes at level 'L' of a binary tree? (Root is at L=0)",
    options: ["2L", "2^L", "2^(L+1)", "2^(L-1)"],
    answer: "2^L"
  },
  {
    question: "Which data structure is typically used to implement Level Order Traversal of a tree?",
    options: ["Stack", "Queue", "Priority Queue", "Linked List"],
    answer: "Queue"
  },

  // --- Binary Search Tree (BST) ---
  {
    question: "In a Binary Search Tree (BST), the value of the left child must be:",
    options: ["Greater than the root", "Less than or equal to the root", "Equal to the root", "Greater than the right child"],
    answer: "Less than or equal to the root"
  },
  {
    question: "Which traversal of a BST outputs the node values in sorted ascending order?",
    options: ["Pre-order", "Post-order", "In-order", "Level-order"],
    answer: "In-order"
  },
  {
    question: "What is the worst-case time complexity for searching an element in a BST?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(n)"
  },
  {
    question: "In a balanced BST (like AVL), what is the time complexity for insertion?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(log n)"
  },
  {
    question: "When deleting a node with two children in a BST, which node usually replaces it?",
    options: ["The root node", "The leftmost leaf", "In-order successor or predecessor", "The right child"],
    answer: "In-order successor or predecessor"
  },
  {
    question: "What is the result of a Pre-order traversal of a BST with root 5, left 3, and right 8?",
    options: ["3, 5, 8", "3, 8, 5", "5, 3, 8", "8, 5, 3"],
    answer: "5, 3, 8"
  },
  {
    question: "Which of the following is NOT a self-balancing binary search tree?",
    options: ["AVL Tree", "Red-Black Tree", "Splay Tree", "Complete Binary Tree"],
    answer: "Complete Binary Tree"
  },
  {
    question: "In a BST, the smallest element is always found at:",
    options: ["The root", "The rightmost node", "The leftmost node", "Any leaf node"],
    answer: "The leftmost node"
  },

  // --- Mixed Tree Concepts ---
  {
    question: "A binary tree with 'n' nodes has how many NULL pointers?",
    options: ["n", "n + 1", "n - 1", "2n"],
    answer: "n + 1"
  },
  {
    question: "If the Pre-order and In-order traversals are given, can we uniquely reconstruct the binary tree?",
    options: ["Yes", "No", "Only if it is a BST", "Only if it is a Full Tree"],
    answer: "Yes"
  },
  {
    question: "The number of edges in a tree with 'n' nodes is:",
    options: ["n", "n + 1", "n - 1", "log n"],
    answer: "n - 1"
  },
  {
    question: "In a complete binary tree, if a node is at index 'i' (1-based), its parent is at:",
    options: ["2i", "i + 1", "floor(i / 2)", "i - 1"],
    answer: "floor(i / 2)"
  },
  {
    question: "A tree is a specialized case of which data structure?",
    options: ["Stack", "Graph", "Queue", "Array"],
    answer: "Graph"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const TreeQuiz = () => {
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
      const topicName = 'Tree & Binary Tree';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Tree Completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Some error occured');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (score >= 15) {
      addTopic();
    } else {
      toast.error('Correctly answer at least 15 questions to mark as completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Tree, Binary Tree & Binary Search Tree Quiz</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Tree, Binary Tree & Binary Search Tree</p>
          <p className='mt-4'>This quiz consists of 20 multiple-choice questions designed to assess your understanding of general tree concepts, binary trees, and binary search trees. To successfully complete the quiz and mark the topic as completed, you need to answer at least 15 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Tree, Binary Tree, & Binary Search Tree</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of tree data structures</p>
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

export default TreeQuiz