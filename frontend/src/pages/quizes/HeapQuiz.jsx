const quizData = [
  // --- Min-Heap ---
  {
    question: "In a Min-Heap, what is the relationship between a parent node 'P' and its children 'C'?",
    options: ["P >= C", "P <= C", "P = C / 2", "P > C"],
    answer: "P <= C"
  },
  {
    question: "What is the time complexity to find the minimum element in a Min-Heap?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    answer: "O(1)"
  },
  {
    question: "If a Min-Heap is implemented in a 0-indexed array, what is the left child of a node at index 'i'?",
    options: ["2i", "2i + 1", "2i + 2", "i / 2"],
    answer: "2i + 1"
  },
  {
    question: "Which operation is performed after removing the root from a Min-Heap to restore its property?",
    options: ["Heapify-up", "Linear search", "Heapify-down", "Rotation"],
    answer: "Heapify-down"
  },
  {
    question: "What is the complexity of inserting a new element into a Min-Heap of size 'n'?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: "O(log n)"
  },
  {
    question: "A Min-Heap is essentially which type of binary tree?",
    options: ["Full Binary Tree", "Complete Binary Tree", "Perfect Binary Tree", "Binary Search Tree"],
    answer: "Complete Binary Tree"
  },
  {
    question: "In a Min-Heap array [10, 20, 30, 40, 50], where would the value '5' be placed after insertion and heapify?",
    options: ["At the root", "As a leaf", "At index 2", "At the end of the array"],
    answer: "At the root"
  },
  {
    question: "What is the complexity of building a Min-Heap from an unsorted array of 'n' elements?",
    options: ["O(n log n)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(n)"
  },
  {
    question: "In a Min-Heap, the smallest element is always at the root. Where is the largest element?",
    options: ["At the last index", "In one of the leaf nodes", "The right child of the root", "The left child of the root"],
    answer: "In one of the leaf nodes"
  },
  {
    question: "Which data structure is a Min-Heap typically used to implement?",
    options: ["Stack", "Hash Map", "Priority Queue", "Deque"],
    answer: "Priority Queue"
  },

  // --- Max-Heap ---
  {
    question: "In a Max-Heap, where is the maximum element always found?",
    options: ["The leftmost leaf", "The rightmost leaf", "The root node", "The middle node"],
    answer: "The root node"
  },
  {
    question: "In a 0-indexed array representation of a Max-Heap, how do you find the parent of a node at index 'i'?",
    options: ["(i - 1) / 2", "2i", "i / 2", "2i + 1"],
    answer: "(i - 1) / 2"
  },
  {
    question: "What happens during a 'Heapify-up' operation in a Max-Heap?",
    options: ["Node is swapped with its smaller child", "Node is swapped with its parent if it is larger", "Node is moved to the root directly", "Node is deleted"],
    answer: "Node is swapped with its parent if it is larger"
  },
  {
    question: "Which sorting algorithm is based on the Max-Heap data structure?",
    options: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"],
    answer: "Heap Sort"
  },
  {
    question: "In a Max-Heap of height 'h', what is the maximum number of nodes?",
    options: ["2^h", "2^(h+1) - 1", "h^2", "2h"],
    answer: "2^(h+1) - 1"
  },
  {
    question: "If we delete the root of a Max-Heap, which node replaces it before the heapify process starts?",
    options: ["The largest child", "The last node in the heap", "The smallest leaf", "The left child"],
    answer: "The last node in the heap"
  },
  {
    question: "What is the time complexity of the 'Decrease Key' operation in a Max-Heap?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: "O(log n)"
  },
  {
    question: "What is the right child index of a node at index 3 in a Max-Heap array?",
    options: ["6", "7", "8", "9"],
    answer: "8"
  },
  {
    question: "Which of the following is a valid Max-Heap array?",
    options: ["[100, 50, 80, 10, 20]", "[10, 20, 30, 40]", "[50, 100, 80, 20]", "[100, 10, 120, 5]"],
    answer: "[100, 50, 80, 10, 20]"
  },
  {
    question: "In a Max-Heap, a node at level 'k' is always ______ its descendants.",
    options: ["Smaller than", "Greater than or equal to", "Equal to", "Half of"],
    answer: "Greater than or equal to"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const HeapQuiz = () => {
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
      const topicName = 'Heap';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Heap Completed');
    } catch (error) {
      toast.error(error.response?.data?.message ||'Some error occured');
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
          <h3 className='text-xl font-semibold mx-auto'>Heap Quiz</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Heaps</p>
          <p className='mt-4'>This quiz consists of 20 multiple-choice questions designed to assess your understanding of heaps, including their structure, operations, and properties. To successfully complete the quiz and mark the topic as completed, you need to answer at least 15 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Heap</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of heaps</p>
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
                    className={`block w-full text-left px-4 py-2 rounded border ${
                      selected
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

export default HeapQuiz