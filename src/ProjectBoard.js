import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ProjectBoard.css';

const initialTasks = [
  { id: 'task-1', content: 'Task 1' },
  { id: 'task-2', content: 'Task 2' },
  { id: 'task-3', content: 'Task 3' },
];


const statuses = ['Todo', 'In Progress', 'Done'];

const ProjectBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const draggedTask = tasks.find(task => task.id === draggableId);
    const updatedTasks = tasks.filter(task => task.id !== draggableId);

    if (source.droppableId !== destination.droppableId) {
      const droppedIndex = destination.index;
      updatedTasks.splice(droppedIndex, 0, draggedTask);
    } else {
      updatedTasks.splice(destination.index, 0, draggedTask);
    }

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="project-board">
        {statuses.map((status, index) => (
          <div key={status} className="status-column">
            <h2>{status}</h2>
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`status ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                >
                  {tasks.map((task, taskIndex) => (
                    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectBoard;
