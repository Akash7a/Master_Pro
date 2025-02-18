import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext';

const ViewSingleTask = () => {
    const { taskId } = useParams();
    const { getSingleTask, loading, error } = useContext(TaskContext);
    const [task, setTask] = useState(null);
 
    useEffect(() => {
        const fetchTask = async () => {
            if (task) return;   
    
            const result = await getSingleTask(taskId);
            console.log("result for single task", result);
            
            if (result?.data?.task) {
                setTask(result.data.task);
            } else {
                console.log("Task data not found");
                setTask(null);
            }
        };
        
        if (taskId) { 
            fetchTask();
        }
    }, [taskId, getSingleTask]); 
    
    if (loading) {
        return <p className="text-center text-gray-500">Loading task...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading task: {error}</p>;
    }

    return (
        <div className="mt-16 max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
            {task ? (
                <>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{task.title}</h2>
                    <p className="text-lg text-gray-600">{task.description}</p>
                    <p className="mt-2 text-gray-500"><strong>Priority: </strong>{task.priority}</p>
                    <p className="mt-2 text-gray-500"><strong>Status: </strong>{task.status}</p>
                </>
            ) : (
                <p>No task found.</p>
            )}
        </div>
    )
}

export default ViewSingleTask