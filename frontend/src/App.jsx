import Graph from "./pages/Data Structure/Graph"
import Hash from "./pages/Data Structure/Hash"
import MaxHeap from "./pages/Data Structure/Heap/Maxheap"
import MinHeap from "./pages/Data Structure/Heap/Minheap"
import DoublyCicularLL from "./pages/Data Structure/Linked List/DoublyCicularLL"
import CircularLL from "./pages/Data Structure/Linked List/CircularLL"
import DoublyLinkedList from "./pages/Data Structure/Linked List/DoublyLinkedList"
import Linkedlist from "./pages/Data Structure/Linked List/Linkedlist"
import CircularQueue from "./pages/Data Structure/Queue/CircularQueue"
import DoubleEndedQueue from "./pages/Data Structure/Queue/DoubleEndedQueue"
import Queue from "./pages/Data Structure/Queue/Queue"
import Stack from "./pages/Data Structure/Stack"
import BinaryTree from "./pages/Data Structure/Tree/BinaryTree"
import BSTVisualizer from "./pages/Data Structure/Tree/BST"
import TreeVisualizer from "./pages/Data Structure/Tree/Tree"
import BubbleSort from "./pages/Sorting/BubbleSort"
import MergeSort from "./pages/Sorting/MergeSort"
import InsertionSort from "./pages/Sorting/InsertionSort"
import QuickSortVisualizer from "./pages/Sorting/QuickSort"
import SelectionSortVisualizer from "./pages/Sorting/SelectionSort"
import BinarySearch from "./seraching/BinarySearch"
import SignUp from "./pages/auth/SignUp"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/components/Dashboard"
import Navbar from "./pages/components/Navbar"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Array from "./pages/Data Structure/Array"
import Footer from "./pages/components/Footer"


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/array" element={<Array />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/queue" element={<Queue />} />
        <Route path='/deque' element={<DoubleEndedQueue />} />
        <Route path="/circularqueue" element={<CircularQueue />} />
        <Route path="/linkedlist" element={<Linkedlist />} />
        <Route path='/doublylinkedlist' element={<DoublyLinkedList />} />
        <Route path="/cicularlinkedlist" element={<CircularLL />} />
        <Route path="/doublycircularll" element={<DoublyCicularLL />} />
        <Route path="/tree" element={<TreeVisualizer />} />
        <Route path="/binarytree" element={<BinaryTree />} />
        <Route path="/bst" element={<BSTVisualizer />} />
        <Route path="/minheap" element={<MinHeap />} />
        <Route path="/maxheap" element={<MaxHeap />} />
        <Route path="/sort/bubble" element={<BubbleSort />} />
        <Route path="/sort/insertion" element={<InsertionSort />} />
        <Route path="/sort/merge" element={<MergeSort />} />
        <Route path="/sort/quick" element={<QuickSortVisualizer />} />
        <Route path="/sort/selection" element={<SelectionSortVisualizer />} />
        <Route path="/map" element={<Hash />} />
        <Route path="/binarysearch" element={<BinarySearch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
