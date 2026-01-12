import React from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { MdDataArray } from "react-icons/md";
import { GiStack } from "react-icons/gi";
import { RxDotsHorizontal } from "react-icons/rx";
import { HiOutlineViewList } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import { TbBinaryTreeFilled } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { SiHashnode } from "react-icons/si";
import { TbDatabaseSearch } from "react-icons/tb";
import { GrGraphQl } from "react-icons/gr";

const topics = [
  { name: "Array", path: "/array", icon: <MdDataArray />, desciption: "Learn about arrays, their structure, and common operations.", topics: 5 },
  { name: "Stack", path: "/stack", icon: <GiStack />, desciption: "Understand stacks, LIFO principle, and stack operations.", topics: 3 },
  { name: "Queue", path: "/queue", icon: <RxDotsHorizontal />, desciption: "Explore queues, FIFO principle, and queue operations.", topics: 3 },
  { name: "Linked List", path: "/linkedlist", icon: <HiOutlineViewList />, desciption: "Dive into linked lists, node structures, insertion, deletion and traversal techniques.", topics: 4 },
  { name: "Tree", path: "/tree", icon: <ImTree />, desciption: "Discover tree data structures, types of trees, and tree insertion, deletion.", topics: 3 },
  { name: "Heap", path: "/minheap", icon: <TbBinaryTreeFilled />, desciption: "Learn about heaps, min-heaps, max-heaps, and heap operations.", topics: 2 },
  { name: "Sorting", path: "/sort/bubble", icon: <SlGraph />, desciption: "Understand various sorting algorithms like bubble sort, selection sort, quicksort, insertion sort and merge sort.", topics: 5 },
  { name: "Map", path: "/map", icon: <SiHashnode />, desciption: "Explore map data structures, key-value pairs, and common map operations.", topics: 3 },
  { name: "Binary Search", path: "/binarysearch", icon: <TbDatabaseSearch />, desciption: "Dive into binary search algorithm, its implementation, and efficiency.", topics: 1 },
  { name: "Graph", path: "/graph", icon: <GrGraphQl />, desciption: "Learn about graph data structures, types of graphs, and graph traversal algorithms(bfs and dfs).", topics: 4 },
];

const Home = () => {
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <Toaster position='top-center' />
      <h1 className='text-3xl font-bold mb-6 text-center'>What do you want to learn?</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {topics.map((topic, idx) => (
          <Link key={idx} to={topic.path} className='block'>
            <div className='bg-gray-100 rounded-lg shadow-sm h-45 p-4 flex flex-col justify-between transition transform hover:scale-105 hover:shadow-lg'>
              <div className='flex items-start gap-3'>
                <div className='bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl'>
                  {topic.icon}
                </div>
                <div className='flex-1'>
                  <div className='text-gray-900 font-semibold text-lg'>{topic.name}</div>
                  <div className='text-gray-500 text-sm mt-1 overflow-hidden' style={{maxHeight: '4rem'}}>{topic.desciption}</div>
                </div>
              </div>
              <div>
                <span className='inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full'>{topic.topics} algorithms</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <hr className='mb-4 mt-4 opacity:30 faded' />
      
      <h2 className='text-2xl text-center font-semibold mt-8 mb-2' id='about'>About VisAlgo</h2>
      <p className='mt-2 text-lg text-gray-700 text-center mb-8 border border-gray-200 p-4 rounded-lg'>
        VisAlgo is your comprehensive guide to Data Structures and Algorithms. Whether you're a beginner looking to understand the basics or an experienced developer aiming to refine your skills, VisAlgo offers interactive visualizations and detailed explanations to help you master essential concepts. Start your learning journey with us today!
      </p>
    </div>
  )
}

export default Home