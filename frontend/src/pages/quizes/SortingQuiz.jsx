const quizData = [
  // --- Bubble, Selection, and Insertion Sort ---
  {
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
    answer: "O(n^2)"
  },
  {
    question: "Which sorting algorithm works by repeatedly finding the minimum element and moving it to the beginning?",
    options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Merge Sort"],
    answer: "Selection Sort"
  },
  {
    question: "Which sorting algorithm is often compared to the way one sorts a hand of playing cards?",
    options: ["Quick Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    answer: "Insertion Sort"
  },
  {
    question: "Which of the following sorting algorithms is 'stable' by nature?",
    options: ["Quick Sort", "Selection Sort", "Heap Sort", "Insertion Sort"],
    answer: "Insertion Sort"
  },
  {
    question: "In Bubble Sort, after the first pass, which element is guaranteed to be in its correct sorted position?",
    options: ["The smallest element", "The middle element", "The largest element", "No element is guaranteed"],
    answer: "The largest element"
  },
  {
    question: "Selection Sort makes how many swaps in the worst case?",
    options: ["O(n^2)", "O(n)", "O(log n)", "O(n log n)"],
    answer: "O(n)"
  },
  {
    question: "What is the best-case time complexity of an optimized Bubble Sort (with a flag)?",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
    answer: "O(n)"
  },

  // --- Merge Sort and Quick Sort ---
  {
    question: "Merge Sort is based on which algorithmic paradigm?",
    options: ["Greedy approach", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
    answer: "Divide and Conquer"
  },
  {
    question: "Which sorting algorithm uses a 'pivot' element to partition the array?",
    options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    answer: "Quick Sort"
  },
  {
    question: "What is the space complexity of a standard Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: "O(n)"
  },
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(n^3)"],
    answer: "O(n^2)"
  },
  {
    question: "Which sorting algorithm is generally considered the fastest in practice for large, random datasets?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
    answer: "Quick Sort"
  },
  {
    question: "Merge Sort's time complexity in the best, average, and worst case is always:",
    options: ["O(n^2)", "O(n)", "O(n log n)", "O(log n)"],
    answer: "O(n log n)"
  },
  {
    question: "In Quick Sort, the worst-case occurs when the pivot is always:",
    options: ["The median", "The smallest or largest element", "A random element", "The middle element"],
    answer: "The smallest or largest element"
  },

  // --- Comparative & Advanced Concepts ---
  {
    question: "Which of the following is an 'in-place' sorting algorithm?",
    options: ["Merge Sort", "Quick Sort", "Radix Sort", "External Sort"],
    answer: "Quick Sort"
  },
  {
    question: "What is the main advantage of Merge Sort over Quick Sort?",
    options: ["It is faster in practice", "It uses less memory", "It has a guaranteed O(n log n) worst-case", "It is easier to implement"],
    answer: "It has a guaranteed O(n log n) worst-case"
  },
  {
    question: "A sorting algorithm is called 'stable' if:",
    options: ["It takes O(n log n) time", "It uses O(1) extra space", "It maintains the relative order of equal elements", "It never swaps elements"],
    answer: "It maintains the relative order of equal elements"
  },
  {
    question: "Which sorting algorithm is most efficient for sorting a nearly sorted array?",
    options: ["Selection Sort", "Quick Sort", "Insertion Sort", "Merge Sort"],
    answer: "Insertion Sort"
  },
  {
    question: "Which of these is NOT an internal sorting algorithm?",
    options: ["Bubble Sort", "External Merge Sort", "Quick Sort", "Insertion Sort"],
    answer: "External Merge Sort"
  },
  {
    question: "Which sorting algorithm uses a recursive approach to build two sorted halves and then combines them?",
    options: ["Selection Sort", "Merge Sort", "Bubble Sort", "Quick Sort"],
    answer: "Merge Sort"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const SortingQuiz = () => {
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
      const topicName = 'Sorting';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Sorting Completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Quiz on Sorting</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Sorting Algorithms</p>
          <p className='mt-4'>This quiz consists of 15 multiple-choice questions designed to assess your understanding of sorting algorithms, including their time complexity, stability, and practical applications. To successfully complete the quiz and mark the topic as completed, you need to answer at least 15 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Sorting</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of sorting algorithms</p>
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
              className="mt-4 md:px-6 md:py-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default SortingQuiz