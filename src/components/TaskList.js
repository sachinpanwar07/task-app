import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = ({ tasks, onDelete }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onDelete(id); // Update tasks list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} - Due Date: {task.dueDate}
            <div>
              <Link to={`/edit-task/${task._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
