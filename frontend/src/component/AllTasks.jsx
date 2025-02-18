import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

const AllTasks = () => {
  const {setEditingTask, tasks, loading, error, getAllTasks, deleteTask, deleteAllTasks, toggleTask } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  if (error) return <p className="text-center text-red-500">Error loading tasks!</p>;
  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;

  return (
    <div className="mt-16 max-w-5xl w-full relative">
      <div>
        <button onClick={() => deleteAllTasks()} className='absolute -top-18 -right-1 bg-amber-700 font-bold px-3 py-2 text-gray-100 rounded-lg shadow-gray-400 shadow-lg hover:bg-red-900 duration-200'>Clear All</button>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        My Tasks
      </h2>
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="p-4 bg-white rounded-lg shadow-md my-3 relative">
              <div className='absolute top-1 right-1 flex gap-2'>
                <button onClick={() => deleteTask(task._id)} className="text-xl sm:text-3xl md:text-2xl lg:text-lg">❌</button>
                <button className="text-xl sm:text-3xl md:text-2xl lg:text-lg" onClick={() => toggleTask(task._id)}>✅</button>
                <button className="text-xl sm:text-3xl md:text-2xl lg:text-lg" onClick={() => {
                  if (task.status !== "completed") {
                    setEditingTask(task);
                  } else {
                    setEditingTask(null);
                  }
                }}>📝</button>
              </div>
              <p className={`absolute bottom-1 right-1 ${task.status === "pending" ? "text-yellow-600" : task.status === "completed" ? "text-green-600" : "text-black"}`}>
                {task.status}
              </p>
              <h3 className={`text-base sm:text-lg md:text-xl text-start font-semibold text-gray-700 ${task.status === "completed" ? "line-through text-red-900 font-bold" : ""}`}>
                {task.title}
              </h3>
              <p className={`text-base sm:text-lg md:text-xl text-start font-semibold text-gray-700 ${task.status === "completed" ? "line-through text-amber-800 font-bold" : ""}`}>
                {task.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
          No tasks found. Start by adding a new task!
        </p>
      )}
    </div>
  );
};

export default AllTasks;