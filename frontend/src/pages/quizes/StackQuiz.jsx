import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

const quizData = [
  {
    question: "The best data structure to check whether an arithmetic expression has balanced parenthesis is a:",
    options: ["Queue", "Stack", "Tree", "List"],
    answer: "Stack"
  },
  {
    question: "The minimum number of stacks needed to implement a queue is:",
    options: ["3", "1", "2", "4"],
    answer: "2"
  },
  {
    question: "Which one of the following is an application of Stack Data Structure?",
    options: ["Managing function calls", "The stock span problem", "Arithmetic expression evaluation", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which of the following is true about linked list implementation of stack?",
    options: ["Push/Pop at different ends", "Push/Pop at the same end (Beginning)", "Push/Pop at the same end (End)", "None of the above"],
    answer: "Push/Pop at the same end (Beginning)"
  },
  {
    question: "Which of the following is not an inherent application of stack?",
    options: ["Implementation of recursion", "Evaluation of a postfix expression", "Job scheduling", "Reverse a string"],
    answer: "Job scheduling"
  },
  {
    question: "Consider: Push(54); push(52); pop(); push(55); push(62); s=pop();. What is the value of s?",
    options: ["54", "52", "55", "62"],
    answer: "62"
  },
  {
    question: "What is the time complexity of push and pop in a linked-list-based stack?",
    options: ["O(1) push, O(n) pop", "O(1) push, O(1) pop", "O(n) push, O(1) pop", "O(n) push, O(n) pop"],
    answer: "O(1) push, O(1) pop"
  },
  {
    question: "The postfix form of (A + B^ D) / (E – F) + G is:",
    options: ["ABD^ + EF – / G+", "ABD + ^EF – / G+", "ABD + ^EF / – G+", "ABD^ + EF / – G+"],
    answer: "ABD^ + EF – / G+"
  },
  {
    question: "For a stack of size 5: Push(a); Pop(); Push(b); Push(c); Pop(); Push(d); Pop(); Pop(); Push(e). Result?",
    options: ["Underflow occurs", "Operations performed smoothly", "Overflow occurs", "Stack becomes full"],
    answer: "Operations performed smoothly"
  },
  {
    question: "A stack is also known as a _____ data structure.",
    options: ["FIFO", "LIFO", "LILO", "Random Access"],
    answer: "LIFO"
  }
];

export default function StackQuiz() {
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
      const topicName = 'Stack';
      const userId = user._id;
      await axios.put(topicsCovered, { userId, topicName },
        { withCredentials: true }
      );
      toast.success('Stack Completed');
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
          <h3 className='text-xl font-semibold mx-auto'>Stack Quiz</h3>
          <p className='text-gray-600 text-lg'>Test your knowledge of Stacks</p>
          <p className='mt-4'>This quiz consists of 10 multiple-choice questions designed to assess your understanding of stacks, including their operations, applications, and properties. To successfully complete the quiz and mark the topic as completed, you need to answer at least 7 questions correctly. Good luck!</p>
          <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
        </div>
        :
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Stack Quiz</h1>
          <p className='text-gray-600 text-lg mb-3'>Test your knowledge of stack data structure</p>
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
              className="mt-4 p-2 md:px-6 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
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
  );
}