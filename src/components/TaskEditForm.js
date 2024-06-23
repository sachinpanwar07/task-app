import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = ({ onUpdateTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdateTask(task);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
