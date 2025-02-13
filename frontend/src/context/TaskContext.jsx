import React, { createContext, useState } from 'react';
import axios from "axios";

export const TaskContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const TaskProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);  // ✅ Ensure tasks is always an array

  const createNewTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/tasks/addnewTask`, taskData, { withCredentials: true });
      console.log("creating new task response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating new task", error);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    setLoading(true);
    setError(null);  // ✅ Reset error before fetching
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/tasks/getAllTask`, { withCredentials: true });
      
      setTasks(response.data.data.tasks || []); 

    } catch (error) {
      console.error("Error fetching tasks", error);
      setError(error.response?.data || error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ createNewTask, getAllTasks, error, loading, tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;