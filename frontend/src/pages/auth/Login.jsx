import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/links';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Login = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const password = e.target.password.value;
            const email = e.target.email.value;

            const res = await axios.post(login, {
                email,
                password
            }, { withCredentials: true });

            setUser(res.data.user);
            toast.success(`${res?.data?.message}`)

            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col w-[90%] sm:max-w-md mx-auto align-middle mt-10 p-6 border border-gray-300 rounded-md shadow-md'>
            <Toaster position="top-center" />
            <h1 className='text-2xl font-bold text-center'>Login to your account</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-2 border bg-gray-100 border border-gray-400 pb-4 mt-4 rounded-md'>
                <div className='flex flex-col m-4 gap-2'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input type="email" name='email' placeholder='Enter your email address' className='border border-gray-400 mb-4 rounded-md p-2' required />
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input type="password" name='password' placeholder='Enter your password' className='border border-gray-400 mb-4 rounded-md p-2' required />
                    <button type='submit' className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 text-white rounded-md' disabled={loading}>{loading ? 'Submitting' : 'Submit'}</button>
                </div>

                <p className='text-center'>Don't have an account? <Link to={'/signup'} className='text-blue-700'>Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login
