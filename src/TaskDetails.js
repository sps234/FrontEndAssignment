import React, { useState } from 'react';
import './TaskDetails.css';

const TaskDetails = ({ tasks, deleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
  };

  const handleDeleteClick = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setSelectedTask(null);
    }
  };

  return (
    <div className="task-details-container">
      {selectedTask && (
        <>
          <h2 className="task-details-title">{selectedTask.title}</h2>
          <p className="task-details-description">{selectedTask.description}</p>
          <div>
            <button className="task-details-button" onClick={handleDeleteClick}>
              Delete Task
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
