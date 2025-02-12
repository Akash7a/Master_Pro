import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/UserContext'

const Home = () => {
  const {profile,loading,setLoading} = useContext(AppContext);

  const username = profile?.username || "to";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome,{username} TaskMaster Pro</h1>
        <p className="text-gray-600 text-lg">
          Organize your tasks efficiently and boost productivity with our AI-powered task management system.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Task Management</h3>
          <p className="text-gray-500 mt-2">Easily create, update, and track your tasks.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">AI Assistance</h3>
          <p className="text-gray-500 mt-2">Get smart suggestions for optimizing your workflow.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Team Collaboration</h3>
          <p className="text-gray-500 mt-2">Work together with your team in real-time.</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-gray-600 text-center">
        <p>© 2025 TaskMaster Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home