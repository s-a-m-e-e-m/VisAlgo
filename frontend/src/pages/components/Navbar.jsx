import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { askDoubt, logout } from '../../utils/links';
import toast from 'react-hot-toast';
import { FaBrain } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { SiThealgorithms } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

  const { user, setUser } = useContext(AuthContext);
  const [enableAi, setEnableAi] = useState(false);
  const [answer, setAnswer] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axios.post(logout);
    toast.success("logout successfull")
    setUser(null);
  }

  const aksAi = async (e) => {
    e.preventDefault();
    try {
      const question = e.target.question.value;
      const result = await axios.post(askDoubt,
        { question }, { withCredentials: true });
      setAnswer(result.data.answer)
    } catch (error) {
      setAnswer(error.response?.data?.message || "something went wrong please try after some time.")
    }
  }

  return (
    <div className=''>
      <nav className="z-10 mb-4 mt-2 flex flex-row justify-between items-center px-5 py-2 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <SiThealgorithms className="text-blue-500 " size={'24'} />
            <p className='text-xl'>VisAlgo</p>
          </a>
          <button className="px-3 py-1 rounded-md bg-gray-100 text-md sm:text-lg hover:bg-gray-200 transition bg-yellow-400 hover:bg-yellow-500">
            <Link to={'/'}>Explore</Link>
          </button>
        </div>

        <div className="flex gap-3">

          <div className="relative group">
            <button onClick={() => setEnableAi(true)} className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 transition cursor-pointer">
              <FaBrain size={'24'} />
            </button>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
              Ask Doubt
            </span>
          </div>

          {!user ? (
            <button className="p-2 hidden sm:block rounded-md bg-blue-500 text-lg text-white hover:bg-blue-600 transition cursor-pointer">
              <Link to='/signup'>Sign Up</Link>
            </button>
          ) : (
            <>
              <div className='flex items-center hidden sm:flex justify-center w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold'>
                <Link to={'/profile'}>{user.name.charAt(0).toUpperCase()}</Link>
              </div>
              <button onClick={handleLogout}
                className={`p-2 rounded-md hidden sm:block bg-red-500 text-white hover:bg-red-600 transition cursor-pointer text-lg`}>
                Logout
              </button>
            </>
          )}

          <GiHamburgerMenu className='block sm:hidden mt-1 ml-2 hover:bg-gray-200 transition cursor-pointer text-2xl' onClick={()=>setMenuOpen((prev)=>!prev)} />
        </div>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div className='sm:hidden absolute top-16 right-5 w-48 bg-white shadow-lg rounded-md border z-50 '>
          <div className='flex flex-col p-3 gap-3'>
            {!user ? (
              <Link to={'/signup'} onClick={()=>setMenuOpen(false)}
              className='p-2 bg-blue-500 text-lg text-white rounded-md hover:bg-blue-600'>
                Sign Up
              </Link>
            ) : (
              <>
                <Link to={'/profile'} onClick={()=>setMenuOpen(false)}
                className=' cursor-pointer text-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg'>Profile</Link>

                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className='p-2 rounded-md text-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer'>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {enableAi && (
        <div className="fixed right-0 top-0 h-full w-full sm:w-[60%] md:w-[35%] bg-white shadow-lg z-50 flex flex-col p-4 border-l border-gray-300 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaBrain className="text-yellow-500" /> Ask AI
            </h2>
            <button
              onClick={() => setEnableAi(false)}
              className="text-gray-500 hover:text-red-500 transition cursor-pointer"
            >
              <RxCross2 size={24} />
            </button>
          </div>

          <form onSubmit={aksAi} className="flex flex-col gap-4 flex-grow">
            <input
              type="text"
              name="question"
              placeholder="Type your question..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition text-lg cursor-pointer"
            >
              Get Answer
            </button>

            {answer.length > 0 && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300 overflow-auto max-h-[80vh]">
                <h3 className="font-semibold text-gray-700 mb-2">Answer:</h3>
                <p className="text-gray-800 whitespace-pre-line text-md pb-8">{answer}</p>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar