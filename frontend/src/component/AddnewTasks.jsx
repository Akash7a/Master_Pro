import React, { useContext, useEffect, useRef, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

const AddnewTasks = () => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "",
    });
    const { createNewTask, loading, editTask, editingTask } = useContext(TaskContext);

    const scrollToEditigTask = useRef(null);

    useEffect(() => {
        if (editingTask) {
            setTaskData({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
            });
            scrollToEditigTask.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [editingTask]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const submitHandler = (e) => {
        e.preventDefault();

        if (editingTask) {
            editTask({ taskId: editingTask._id, taskData });
        } else {
            createNewTask(taskData);
        }
        setTaskData({
            title: "",
            description: "",
            priority: "",
        });
    }
    return (
        <div ref={scrollToEditigTask}>
            <form  onSubmit={submitHandler}>
                <div className='flex flex-col'>
                    <label className='w-full text-start my-1' htmlFor='title'>Title</label>
                    <input required type="text" placeholder='Enter title' id="title" className='w-full bg-gray-200 p-2 border border-gray-600 focus:bg-white' name='title' value={taskData.title} onChange={changeHandler} />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="description" className='w-full text-start my-2'>Description</label>
                    <input required type="text" placeholder='Enter description' id="description" className='w-full bg-gray-200 p-2 border border-gray-600 focus:bg-white' name='description' value={taskData.description} onChange={changeHandler} />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="priority" className='w-full text-start my-2'>Priority</label>
                    <input required type="text" placeholder='Enter Priority (e.g., High, Medium, Low)' id="priority" className='w-full bg-gray-200 p-2 border border-gray-600 focus:bg-white' name='priority' value={taskData.priority} onChange={changeHandler} />
                </div>
                <div className="flex flex-col my-4">
                    <button disabled={loading} className='bg-blue-500 p-3 font-semibold text-white hover:bg-blue-600'>  {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        editingTask ? "Updaate Task" : "Add Task"
                    )}</button>
                </div>
            </form>
        </div>
    );
}

export default AddnewTasks;