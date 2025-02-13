import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';

const AllTasks = () => {
  const { tasks, loading, error, getAllTasks } = useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []); 

  if (error) return <p className="text-center text-red-500">Error loading tasks!</p>;
  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;

  return (
    <div className="mt-16 max-w-5xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Tasks</h2>
      {tasks && tasks.length > 0 ? ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="p-4 bg-white rounded-lg shadow-md my-3">
              <h3 className="text-lg text-start font-semibold text-gray-700">{task.title}</h3>
              <p className="text-gray-500 mt-2 text-start">{task.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No tasks found. Start by adding a new task!</p>
      )}
    </div>
  );
};

export default AllTasks;