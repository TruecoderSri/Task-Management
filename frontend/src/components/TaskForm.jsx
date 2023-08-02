import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      completed: completed,
    };

    try {
      await axios.post("https://taskback.azurewebsites.net/api/tasks", newTask);
      console.log("Task added successfully");
      fetchTasks();
      setTitle("");
      setDescription("");
      setCompleted(false);
      setShowForm(false); // Hide the form after submitting
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <button
        className="border-2 border-blue-800 p-2 rounded-md bg-blue-400 font-bold"
        onClick={() => setShowForm(true)}
      >
        Add Task
      </button>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md w-2/4 h-2/4 opacity-2">
            <h2 className="text-lg font-bold flex justify-center">
              Add New Task
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="flex-column">Title:</label>
              <input
                className="border-none bg-gray-100 "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label className="flex-column">Description:</label>
              <textarea
                className="border-none bg-gray-100"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label>Status:</label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
              />
              <label>Yes</label>
              <input
                type="checkbox"
                checked={!completed}
                onChange={() => setCompleted(!completed)}
              />
              <label>No</label>

              <div className="mt-16 flex justify-end">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md"
                  type="submit"
                >
                  Add Task
                </button>
                <button
                  className="px-4 py-1 bg-gray-500 text-white ml-4 rounded-md"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
