import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../context/UserContext';
import { Link, Navigate } from 'react-router-dom';

const Signup = () => {
    const [userData, setUserData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        profilePic: null,
    });
    const { signUpUser, token, loading } = useContext(AppContext);
    const fileInputRef = useRef(null);

    if (token) {
        return <Navigate to="/home" replace />
    }
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const fileChangeHandler = (e) => {
        setUserData((prevData) => ({
            ...prevData,
            profilePic: e.target.files[0],
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", userData.fullname);
        formData.append("username", userData.username);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("profilePic", userData.profilePic);

        signUpUser(formData);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setUserData({
            fullname: "",
            username: "",
            email: "",
            password: "",
            profilePic: null,
        });
    }
    return (
        <div>
            <form onSubmit={submitHandler} className='bg-green-200 p-3 rounded-sm shadow-gray-400 shadow-md'>
                <h1 className='py-3 text-center font-bold text-xl'>Sign up user</h1>
                <div className=''>
                    <label htmlFor="fullname">Fullname</label>
                    <input value={userData.fullname} required onChange={changeHandler} className='bg-gray-100 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="text" id='fullname' name='fullname' placeholder='Enter your fullname' />
                </div>
                <div className=''>
                    <label htmlFor="username">Username</label>
                    <input value={userData.username} required onChange={changeHandler} className='bg-gray-200 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="text" id='username' name='username' placeholder='Enter your username' />
                </div>
                <div className=''>
                    <label htmlFor="email">Email</label>
                    <input value={userData.email} required onChange={changeHandler} className='bg-gray-200 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="text" id='email' name='email' placeholder='Enter your email' />
                </div>
                <div className=''>
                    <label htmlFor="profilePic">Profile Pic</label>
                    <input required onChange={fileChangeHandler} className='bg-gray-200 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="file" id='profilePic' ref={fileInputRef} name='profilePic' />
                </div>
                <div className=''>
                    <label htmlFor="password">Password</label>
                    <input value={userData.password} required onChange={changeHandler} className='bg-gray-200 w-full p-2 my-1 outline-none text-md focus:bg-white rounded-md' type="password" name="password" id="password" placeholder='Enter your password' />
                </div>
                <div className='my-1 py-2 '>
                    <button className='bg-green-400 p-2 rounded text-center w-full font-bold text-white shadow-black shadow-md hover:shadow-lg'>{loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : "Sign Up"}</button>
                </div>
                <div>
                    <p className='text-center'>Already have a account ? <Link to="/login"><span className='text-blue-800 font-bold underline'>Login Here</span></Link></p>
                </div>
            </form>
        </div>
    )
}

export default Signup