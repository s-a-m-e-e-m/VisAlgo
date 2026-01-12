const quizData = [
  {
    question: "What is the most critical prerequisite for using Binary Search on a collection?",
    options: ["The collection must be a Linked List", "The data must be sorted", "The data must be stored in a Hash Table", "The size of the data must be a power of 2"],
    answer: "The data must be sorted"
  },
  {
    question: "What is the worst-case time complexity of Binary Search for an array of size 'n'?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "In Binary Search, if the target element is smaller than the middle element, where do we search next?",
    options: ["The right half of the array", "The left half of the array", "The entire array again", "We terminate the search"],
    answer: "The left half of the array"
  },
  {
    question: "What is the best-case time complexity for Binary Search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(1)"
  },
  {
    question: "Given a sorted array of 1024 elements, what is the maximum number of comparisons required to find an element?",
    options: ["1024", "512", "10", "20"],
    answer: "10"
  },
  {
    question: "Which formula is safer to use for calculating the middle index to avoid integer overflow?",
    options: ["mid = (low + high) / 2", "mid = low + (high - low) / 2", "mid = high - (low / 2)", "mid = low * 2 + high"],
    answer: "mid = low + (high - low) / 2"
  },
  {
    question: "What is the space complexity of an iterative implementation of Binary Search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)"
  },
  {
    question: "Binary Search is an example of which algorithmic paradigm?",
    options: ["Dynamic Programming", "Greedy Algorithm", "Divide and Conquer", "Backtracking"],
    answer: "Divide and Conquer"
  },
  {
    question: "Why is Binary Search not preferred for a Singly Linked List?",
    options: ["Linked lists cannot be sorted", "Linked lists do not support random access (O(1) access to middle)", "Linked lists use more memory", "Linked lists are always circular"],
    answer: "Linked lists do not support random access (O(1) access to middle)"
  },
  {
    question: "In a sorted array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], what is the first middle element checked if searching for 23?",
    options: ["12", "16", "23", "38"],
    answer: "16"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const BinarysearchQuiz = () => {
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
      const topicName = 'Binary Search';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Binary Search Completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Binary Search Quiz</h3>
          <p className='mt-4'>This quiz consists of 10 multiple-choice questions designed to assess your understanding of binary search, including its characteristics, operations, and common use cases. To successfully complete the quiz and mark the topic as completed, you need to answer at least 7 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 mx-auto">Binary Search Quiz</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of binary search</p>
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

export default BinarysearchQuiz