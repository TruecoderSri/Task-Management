import React, { useState } from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCompleted, setEditedCompleted] = useState(false);

  const handleEditTask = (task) => {
    setEditTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCompleted(task.completed);
  };

  const handleSaveTask = async () => {
    try {
      await axios.put(`https://task-management-dnhz.vercel.app/api/tasks/${editTask._id}`, {
        title: editedTitle,
        description: editedDescription,
        completed: editedCompleted,
      });
      setEditTask(null);
      fetchTasks(); // Refresh the task list after updating the task
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (shouldDelete) {
        await axios.delete(`https://task-management-dnhz.vercel.app/api/tasks/${taskId}`);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 border">Title</th>
            <th className="py-2 px-4 bg-gray-100 border">Description</th>
            <th className="py-2 px-4 bg-gray-100 border">Status</th>
            <th className="py-2 px-4 bg-gray-100 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border">
              <td className="py-2 px-4 border">{task.title}</td>
              <td className="py-2 px-4 border">{task.description}</td>
              <td className="py-2 px-4 border">
                <button
                  className={`text-white px-2 py-1 rounded ${
                    task.completed ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </button>
              </td>
              <td className="py-2 px-4 border flex items-center">
                {editTask && editTask._id === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      required
                      className="px-2 py-1 border rounded"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      required
                      className="px-2 py-1 border rounded"
                    />
                    <label className="flex items-center">
                      Completed:
                      <input
                        type="checkbox"
                        checked={editedCompleted}
                        onChange={(e) => setEditedCompleted(e.target.checked)}
                      />
                    </label>
                    <button
                      onClick={handleSaveTask}
                      className="px-2 py-1 bg-green-500 text-white rounded ml-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTask(task)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
