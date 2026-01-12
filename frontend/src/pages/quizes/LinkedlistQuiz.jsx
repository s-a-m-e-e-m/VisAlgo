const quizData = [
  // --- Singly Linked List ---
  {
    question: "What is the time complexity to insert a node at the beginning of a Singly Linked List?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    question: "In a Singly Linked List, what does the 'next' pointer of the last node point to?",
    options: ["The head node", "The previous node", "NULL", "Itself"],
    answer: "NULL"
  },
  {
    question: "Which of the following is a disadvantage of a Singly Linked List compared to an Array?",
    options: ["Dynamic size", "No memory wastage", "Random access is not possible", "Ease of insertion"],
    answer: "Random access is not possible"
  },
  {
    question: "To delete a node 'P' in a Singly Linked List, which information is essential?",
    options: ["Address of node P", "Address of the node before P", "Address of the node after P", "Address of the tail node"],
    answer: "Address of the node before P"
  },
  {
    question: "What is the space complexity of a Singly Linked List with 'n' elements?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: "O(n)"
  },

  // --- Doubly Linked List ---
  {
    question: "Which extra field is present in a Doubly Linked List node that is absent in a Singly Linked List node?",
    options: ["Data field", "Next pointer", "Previous pointer", "Tail pointer"],
    answer: "Previous pointer"
  },
  {
    question: "What is the advantage of a Doubly Linked List over a Singly Linked List?",
    options: ["Less memory usage", "Can be traversed in both directions", "Faster insertion at the head", "Simpler implementation"],
    answer: "Can be traversed in both directions"
  },
  {
    question: "In a Doubly Linked List, what is the value of 'prev' in the head node?",
    options: ["Address of tail", "NULL", "Address of head", "1"],
    answer: "NULL"
  },
  {
    question: "To delete a node in a Doubly Linked List if the pointer to that node is given, the time complexity is:",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    answer: "O(1)"
  },
  {
    question: "How many pointers are modified when inserting a node in the middle of a Doubly Linked List?",
    options: ["2", "3", "4", "6"],
    answer: "4"
  },

  // --- Circular Linked List ---
  {
    question: "In a Circular Singly Linked List, the last node's 'next' pointer points to:",
    options: ["NULL", "The middle node", "The head node", "The second node"],
    answer: "The head node"
  },
  {
    question: "Which of the following is a common application of Circular Linked Lists?",
    options: ["Undo/Redo operations", "Round Robin CPU scheduling", "Recursive function calls", "Binary Search"],
    answer: "Round Robin CPU scheduling"
  },
  {
    question: "What is the main advantage of using a Circular Linked List?",
    options: ["Elements can be accessed randomly", "The list has no beginning or end", "Any node can be a starting point for traversal", "It uses the least amount of memory"],
    answer: "Any node can be a starting point for traversal"
  },
  {
    question: "How do you detect the end of a traversal in a Circular Linked List?",
    options: ["Check if next is NULL", "Check if the current node's address matches the head's address", "Use a counter", "Check if data is zero"],
    answer: "Check if the current node's address matches the head's address"
  },
  {
    question: "Which operation is more efficient in a Circular Linked List if we maintain a 'tail' pointer instead of a 'head' pointer?",
    options: ["Searching", "Deleting the middle element", "Insertion at both head and tail", "Reversing the list"],
    answer: "Insertion at both head and tail"
  },

  // --- Doubly Circular Linked List ---
  {
    question: "In a Doubly Circular Linked List, the 'prev' pointer of the head node points to:",
    options: ["NULL", "The head node itself", "The last node (tail)", "The second node"],
    answer: "The last node (tail)"
  },
  {
    question: "Which of the following describes a Doubly Circular Linked List?",
    options: ["Next of last is head, prev of head is NULL", "Next of last is NULL, prev of head is last", "Next of last is head, prev of head is last", "Next of last is NULL, prev of head is NULL"],
    answer: "Next of last is head, prev of head is last"
  },
  {
    question: "What is the complexity of inserting a node at the end of a Doubly Circular Linked List (given the head)?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    question: "Which structure is most complex to implement among all linked list types?",
    options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Doubly Circular Linked List"],
    answer: "Doubly Circular Linked List"
  },
  {
    question: "In a Doubly Circular Linked List, if 'curr' is the last node, what is 'curr.next.prev'?",
    options: ["The head node", "The last node", "NULL", "The second to last node"],
    answer: "The last node"
  }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const LinkedlistQuiz = () => {
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
      const topicName = 'Linked List';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Linked List Completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Linked List Quiz</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Linked Lists</p>
          <p className='mt-4'>This quiz consists of 20 multiple-choice questions designed to assess your understanding of linked lists, including their structure, operations, and properties. To successfully complete the quiz and mark the topic as completed, you need to answer at least 15 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Quiz on Linked List</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of linked lists</p>
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

export default LinkedlistQuiz