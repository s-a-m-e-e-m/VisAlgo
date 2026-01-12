const quizData = [
  {
    question: "Which of the following data structures follows the FIFO (First-In-First-Out) principle?",
    options: ["Stack", "Queue", "Binary Tree", "Priority Queue"],
    answer: "Queue"
  },
  {
    question: "In a circular queue implemented using an array of size 'n', what is the condition to check if the queue is full?",
    options: ["rear == front", "rear == n - 1", "(rear + 1) % n == front", "front == (rear + 1)"],
    answer: "(rear + 1) % n == front"
  },
  {
    question: "A Deque (Double-Ended Queue) is a data structure where:",
    options: ["Elements can be added at the rear but removed from the front.", "Elements can be added or removed from either the front or the rear.", "Elements are removed based on priority.", "Elements are added at the front but removed from the rear."],
    answer: "Elements can be added or removed from either the front or the rear."
  },
  {
    question: "What is the primary disadvantage of a linear queue implemented using a static array?",
    options: ["Slow access time", "Difficulty in implementation", "Memory wastage (cannot reuse empty spaces before 'front')", "High time complexity for Enqueue"],
    answer: "Memory wastage (cannot reuse empty spaces before 'front')"
  },
  {
    question: "Which of the following is NOT a valid application of a Queue?",
    options: ["CPU Scheduling", "Breadth-First Search (BFS) traversal", "Function call management (Recursion)", "Handling interrupts in Operating Systems"],
    answer: "Function call management (Recursion)"
  },
  {
    question: "In a circular queue, if 'front' is 0 and 'rear' is 4 in an array of size 5, what happens on the next Enqueue operation?",
    options: ["Overflow occurs", "Element is added at index 5", "Element is added at index 0", "Underflow occurs"],
    answer: "Overflow occurs"
  },
  {
    question: "What is the time complexity of the 'enqueue' operation in a standard queue implemented with a linked list?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    answer: "O(1)"
  },
  {
    question: "An 'Input-Restricted Deque' is one where:",
    options: ["Insertion is allowed at only one end, but deletion at both ends.", "Deletion is allowed at only one end, but insertion at both ends.", "Both insertion and deletion are restricted to one end.", "Insertion and deletion are allowed at both ends."],
    answer: "Insertion is allowed at only one end, but deletion at both ends."
  },
  {
    question: "Which data structure is most efficient for implementing a 'Least Recently Used' (LRU) Cache?",
    options: ["Stack", "Circular Queue", "Deque", "Singly Linked List"],
    answer: "Deque"
  },
  {
    question: "If the rear of a circular queue is at index 2 and the size is 5, what is the next index for an element to be inserted?",
    options: ["1", "3", "0", "4"],
    answer: "3"
  },
  {
    question: "A queue where elements are removed based on a specific value rather than the order of insertion is called a:",
    options: ["Circular Queue", "Priority Queue", "Deque", "Linear Queue"],
    answer: "Priority Queue"
  },
  {
    question: "What happens when a Dequeue operation is performed on an empty queue?",
    options: ["Overflow", "Trash value returned", "Underflow", "The program crashes"],
    answer: "Underflow"
  },
  {
    question: "How many pointers are typically maintained in a Linked List implementation of a Queue?",
    options: ["One (Head)", "Two (Front and Rear)", "Three (Front, Rear, and Mid)", "Zero"],
    answer: "Two (Front and Rear)"
  },
  {
    question: "In a Deque, if you restrict both insertion and deletion to only one end, it behaves as a:",
    options: ["Queue", "Stack", "Binary Tree", "Priority Queue"],
    answer: "Stack"
  },
  {
    question: "Which of the following is true about a Circular Queue?",
    options: ["It is a linear data structure.", "It follows FIFO.", "It avoids the problem of empty spaces in a linear array.", "All of the above."],
    answer: "All of the above."
  }
];
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const QueueQuiz = () => {
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
      const topicName = 'Queue';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Queue Completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Some error occured');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (score >= 11) {
      addTopic();
    } else {
      toast.error('Correctly answer at least 11 questions to mark as completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Quiz on Queue, Deque & Circular Queue</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Queues, Deques, and Circular Queues</p>
          <p className='mt-4'>This quiz consists of 15 multiple-choice questions designed to assess your understanding of queues, deques, and circular queues, including their structure, operations, and properties. To successfully complete the quiz and mark the topic as completed, you need to answer at least 11 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Queue, Deque & Circular Queue</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of queue data structures</p>
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

export default QueueQuiz
