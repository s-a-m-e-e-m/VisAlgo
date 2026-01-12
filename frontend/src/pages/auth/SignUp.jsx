import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { sendOtpLink, signUp, verifyOtpLink } from '../../utils/links.js';
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from './AuthContext.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

const SignUp = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const [cooldown, setCooldown] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (verified || !timerActive) return;
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown, timerActive]);


    const sendOtp = async () => {
        if (verified) return;
        try {
            const email = document.querySelector("input[name='email']").value;

        await axios.post(sendOtpLink, { email });
        toast.success("Otp sent to email");
        setOtpSent(true);
        setCooldown(60);
        setTimerActive(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP")
        }
    }

    const verifyOtp = async () => {

        try {
            const email = document.querySelector("input[name='email']").value;
        const otp = document.querySelector("input[name='otp']").value;

        await axios.post(verifyOtpLink, { email, otp });
        toast.success("Email verified");
        setVerified(true);
        setTimerActive(false);
        setCooldown(0);
        } catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed")
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const res = await axios.post(signUp, {
                name,
                email,
                password
            },
                { withCredentials: true }
            )

            setUser(res.data.user);
            toast.success("Sign up successful!");
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign up failed")
        }
    }

    return (
        <div className='flex flex-col w-[90%] sm:max-w-md mx-auto align-middle mt-10 p-6 border border-gray-300 rounded-md shadow-md'>
            <Toaster position="top-center" />
            <h1 className='text-2xl font-bold text-center'>Create your account</h1>
            <p></p>
            <form onSubmit={handleSignUp} className='flex flex-col gap-2 border bg-gray-100 border border-gray-400 pb-4 mt-4 rounded-md'>
                <div className='flex flex-col m-4 gap-2'>
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input type="text" name='name' placeholder='Enter your name' className='border border-gray-400 mb-4 rounded-md p-2' />
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input type="email" name='email' placeholder='Enter your email address' className='border border-gray-400 mb-4 rounded-md p-2' />
                    {!otpSent && (
                        <button type='button' onClick={sendOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 text-white rounded-md'>Send OTP </button>
                    )}
                    {otpSent && !verified && (
                        <button disabled={cooldown > 0 || verified} onClick={sendOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 text-white rounded-md'>
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                        </button>
                    )}

                    {otpSent && !verified && (
                        <div className=''>
                            <input type='text' name='otp' className='border border-gray-400 mb-4 rounded-md p-2 mr-2' placeholder='Enter OTP' />
                            <button type='button' onClick={verifyOtp} className='bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 text-white rounded-md'>Verify OTP</button>
                        </div>
                    )}
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input type="password" name='password' placeholder='Enter your password' className='border border-gray-400 mb-4 rounded-md p-2' />
                    <button type='submit' className={`bg-blue-500 p-2 text-white rounded-md ${!verified ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 cursor-pointer'}`} disabled={!verified}>Submit</button>
                </div>

                <p className='text-center'>Already have an account? <Link to={'/signin'} className='text-blue-700'>Sign In</Link></p>
            </form>
        </div>
    )
}

export default SignUp