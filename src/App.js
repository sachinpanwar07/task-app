import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditTask from './components/TaskEditForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', task);
      fetchTasks(); // Fetch tasks again to update the list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
      fetchTasks(); // Fetch tasks again to update the list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Task Management App</h1>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDelete} />
        <Routes>
          <Route path="/edit-task/:id" element={<EditTask onUpdateTask={handleUpdateTask} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
