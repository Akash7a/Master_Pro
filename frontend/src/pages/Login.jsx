import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/UserContext';

const Login = () => {
    const [userData, setUserData] = useState({
        emailOrUsername: "",
        password: "",
    });
    const { loginUser, token, loading } = useContext(AppContext);

    if (token) {
        return <Navigate to="/home" replace />;
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        loginUser(userData);

        setUserData({
            emailOrUsername: "",
            password: "",
        });
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={submitHandler} className='bg-green-300 p-3 rounded-sm shadow-gray-400 shadow-md'>
                <h1 className='py-3 text-center font-bold text-xl'>Log in user</h1>
                <div className=''>
                    <label htmlFor="emailOrUsername">Email or Username</label>
                    <input value={userData.emailOrUsername} onChange={changeHandler} required className='bg-gray-100 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="text" id='emailOrUsername' name='emailOrUsername' placeholder='Enter your fullname' />
                </div>
                <div className=''>
                    <label htmlFor="password">Password</label>
                    <input value={userData.password} onChange={changeHandler} required className='bg-gray-200 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="password" name="password" id="password" placeholder='Enter your password' />
                </div>
                <div className='my-1 py-2 '>
                    <button className='bg-green-400 p-2 rounded text-center w-full font-bold text-white shadow-black shadow-md hover:shadow-lg'>{loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : "Login"}</button>
                </div>
                <div>
                    <p className='text-center'>Don't have account ? <Link to="/"><span className='text-blue-800 font-bold underline'>Register Here</span></Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login