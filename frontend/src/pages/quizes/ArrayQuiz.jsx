const quizData = [
    {
        question: "What is the primary characteristic of an array's memory allocation?",
        options: [
            "Contiguous memory locations",
            "Nodes scattered throughout the heap",
            "Dynamic allocation on the stack only",
            "Non-linear memory mapping"
        ],
        answer: "Contiguous memory locations"
    },
    {
        question: "What is the time complexity to access an element at a specific index 'i' in an array?",
        options: ["O(n)", "O(log n)", "O(1)", "O(i)"],
        answer: "O(1)"
    },
    {
        question: "In a 0-indexed array of size 'n', what is the index of the last element?",
        options: ["n", "n + 1", "n - 1", "0"],
        answer: "n - 1"
    },
    {
        question: "What is the worst-case time complexity for inserting an element at the beginning of an array of size 'n'?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: "O(n)"
    },
    {
        question: "Which of the following is a disadvantage of a standard static array?",
        options: [
            "Slow access speed",
            "High memory overhead for pointers",
            "Fixed size determined at creation",
            "Random access is not possible"
        ],
        answer: "Fixed size determined at creation"
    },
    {
        question: "What happens when you try to access an index that is outside the bounds of the array?",
        options: [
            "It always returns the last element",
            "It wraps around to the beginning",
            "It typically causes an 'Index Out of Bounds' error",
            "It automatically resizes the array"
        ],
        answer: "It typically causes an 'Index Out of Bounds' error"
    },
    {
        question: "In most programming languages, how is the address of the element at index 'i' calculated?",
        options: [
            "Base Address + (i * size_of_element)",
            "Base Address + i",
            "Base Address - (i * size_of_element)",
            "i * size_of_element"
        ],
        answer: "Base Address + (i * size_of_element)"
    },
    {
        question: "Which operation is more efficient in an array compared to a Singly Linked List?",
        options: [
            "Random Access",
            "Insertion at the beginning",
            "Deletion from the middle",
            "Dynamic resizing"
        ],
        answer: "Random Access"
    },
    {
        question: "What is the time complexity of searching for an element in an unsorted array using Linear Search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: "O(n)"
    },
    {
        question: "In a 2D array defined as 'arr[row][col]', how is it usually stored in memory?",
        options: [
            "In a grid-like physical memory block",
            "As a 1D array in Row-Major or Column-Major order",
            "As a collection of non-contiguous fragments",
            "Using a hash function for each coordinate"
        ],
        answer: "As a 1D array in Row-Major or Column-Major order"
    }
];

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { topicsCovered } from '../../utils/links';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth/AuthContext'

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
            const topicName = 'Arrays';
            const userId = user._id;
            await axios.put(topicsCovered, { userId, topicName },
                { withCredentials: true }
            );
            toast.success('Arrays Completed');
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
        <div className=" mt-4 bg-gray-100 flex items-center justify-center p-2">
            {quizClose ?
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <h3 className='text-xl font-semibold mx-auto'>Array Quiz</h3>
                    <p className='text-gray-600 text-lg'>Test your knowledge of array</p>
                    <p className='mt-4'>This quiz consists of 10 multiple-choice questions designed to assess your understanding of arrays, including their characteristics, operations, and common use cases. To successfully complete the quiz and mark the topic as completed, you need to answer at least 7 questions correctly. Good luck!</p>
                    <button onClick={() => setQuizClose(false)} className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'>Start Quiz</button>
                </div>
                :
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-2 mt-4 mx-auto">Array Quiz</h1>
                    <p className='text-gray-600 text-lg mb-3'>Test your knowledge of array</p>
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
                            className="mt-4 p-2 md:px-6 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
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