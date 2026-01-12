const quizData = [
  {
    question: "What is the primary purpose of a Hash Function?",
    options: ["To sort the data in ascending order", "To map a large key to a small integer index", "To compress the data for storage", "To create a linked list of keys"],
    answer: "To map a large key to a small integer index"
  },
  {
    question: "What is the average time complexity for searching an element in a HashMap?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: "O(1)"
  },
  {
    question: "When two different keys produce the same hash value, it is known as a:",
    options: ["Hash Overlap", "Hash Mismatch", "Collision", "Linear Probe"],
    answer: "Collision"
  },
  {
    question: "Which collision resolution technique uses a linked list to store multiple elements at the same index?",
    options: ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"],
    answer: "Chaining"
  },
  {
    question: "In Open Addressing, what is 'Linear Probing'?",
    options: ["Searching for the next available slot sequentially", "Using a second hash function", "Creating a binary tree at the index", "Increasing the size of the array"],
    answer: "Searching for the next available slot sequentially"
  },
  {
    question: "The ratio of the number of elements to the total capacity of the hash table is called the:",
    options: ["Hash Ratio", "Load Factor", "Fill Index", "Efficiency Constant"],
    answer: "Load Factor"
  },
  {
    question: "What happens in a HashMap when the Load Factor exceeds its threshold?",
    options: ["It stops accepting new elements", "It deletes old elements", "Rehashing occurs (array size increases)", "It switches to a Binary Search Tree"],
    answer: "Rehashing occurs (array size increases)"
  },
  {
    question: "What is the worst-case time complexity of a HashMap search if many collisions occur (using Chaining)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: "O(n)"
  },
  {
    question: "Which of the following is a requirement for a good Hash Function?",
    options: ["It should be slow to compute", "It should map all keys to the same index", "It should distribute keys uniformly", "It should only work for string keys"],
    answer: "It should distribute keys uniformly"
  },
  {
    question: "Which collision resolution technique is prone to 'Primary Clustering'?",
    options: ["Chaining", "Linear Probing", "Double Hashing", "Rehashing"],
    answer: "Linear Probing"
  }
];
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const HashtableQuiz = () => {
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
      const topicName = 'Hash Table';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Hash Table Completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Hash Table Quiz</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Hash Tables</p>
          <p className='mt-4'>This quiz consists of 10 multiple-choice questions designed to assess your understanding of hash tables, including their structure, operations, and collision resolution techniques. To successfully complete the quiz and mark the topic as completed, you need to answer at least 7 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Hash Table</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of hash tables</p>
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

export default HashtableQuiz