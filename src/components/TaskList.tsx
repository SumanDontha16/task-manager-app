import React, { useState } from "react";
import useTasks from "./useTasks";

const TaskList: React.FC = () => {
  // Task-realted operations from the context
  const { tasks, toggleTaskCompletion, deleteTask, editTask } = useTasks();
  
  //State to track the task being edited and its updated text
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newText, setNewText] = useState("");

  // Handles edit operation for a task
  const handleEdit = (taskId: number, currentText: string) => {
    setEditingTaskId(taskId);
    setNewText(currentText);
  };

  // Saves the edited task and resets the state
  const handleSaveEdit = () => {
    if (editingTaskId !== null && newText.trim() !== "") {
      editTask(editingTaskId, newText);
      setEditingTaskId(null);
      setNewText("");
    }
  };

  // Returns the status of a task based on its completion status
  const getStatus = (completed: boolean): string => {
    return completed ? "Done" : "In Progress";
  };

  // Returns the class for a row based on the completion status
  const getRowClass = (completed: boolean): string => {
    return completed ? "text-gray-400 line-through" : "text-gray-700";
  };

  // Formats the date in the desired format
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  return (
    // Table to display the task list
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {/* Table headers */}
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Task Name</th>
          <th className="border border-gray-300 px-4 py-2">Add Date</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className={getRowClass(task.completed)}>
            {/* Table status column */}
            <td className="border border-gray-300 px-4 py-2">
              {getStatus(task.completed)}
            </td>
            {/* Table task name column with optional edit input */}
            <td className="border border-gray-300 px-4 py-2">
              {editingTaskId === task.id ? (
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              ) : (
                <span
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="cursor-pointer"
                >
                  {task.text}
                </span>
              )}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {/* Table add date column */}
              {formatDate(new Date(task.id))}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {/* Table actions column */}
              {task.completed ? (
                // Disable actions for completed tasks
                <span className="text-gray-400">Disabled</span>
              ) : (
                <div className="flex space-x-2">
                  {editingTaskId === task.id ? (
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(task.id, task.text)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;