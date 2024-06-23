import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit Task</button>
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};

export default TaskDetails;
