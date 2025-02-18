import React, { createContext, useState } from 'react';
import axios from "axios";

export const TaskContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const TaskProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);  
  const [editingTask,setEditingTask] = useState(null);

  const createNewTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/tasks/addnewTask`, taskData, { withCredentials: true });
      console.log("creating new task response", response.data);
      await getAllTasks();
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
    setError(null);
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

  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/tasks/deleteSingleTask/${taskId}`, { withCredentials: true });
      console.log("Task deletion response", response.data);
      await getAllTasks();
      return response.data;
    } catch (error) {
      console.error("Error deleting task", error);
      setError(error.response?.data || error.message);
      setTasks([]);
    } finally {
      setLoading(null);
    }
  }

  const deleteAllTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/tasks/deleteAllTasks`, { withCredentials: true });
      console.log("Deleting all tasks response", response.data);
      setTasks([]);
      return response.data;
    } catch (error) {
      console.error("Error deleting all tasks", error);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
      setTasks([]);
    }
  }

  const toggleTask = async (taskId) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/v1/tasks/toggleTask/${taskId}`, {}, { withCredentials: true })
      console.log("toggle task response", response.data);
      await getAllTasks();
      return response.data;
    } catch (error) {
      console.error("Error toggling the task", error);
      setError(error.response?.data || error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  const editTask = async ({ taskId, taskData }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/v1/tasks/editTask/${taskId}`, taskData, { withCredentials: true });
      console.log("Edit response of task",response.data);
      await getAllTasks();
      setEditingTask(null);
      return response.data;
    } catch (error) {
      console.error("Error while editing the task", error);
      setError(error.response?.data || error.message);
      setTasks(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TaskContext.Provider value={{ editTask, toggleTask, deleteAllTasks, deleteTask, createNewTask, getAllTasks,editingTask,setEditingTask, error, loading, tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;