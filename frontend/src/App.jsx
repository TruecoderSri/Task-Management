import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://taskback.azurewebsites.net/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="parent container">
      <div className="heading color-red py-1 px-1 flex justify-center text-6xl opacity-2 font-bold border-b-4 border-blue">
        <h1>Task Management System</h1>
      </div>
      {/* <div className="bg-blue-300 w-auto "></div> */}

      <div>
        <TaskForm fetchTasks={fetchTasks} />
      </div>
      <div>
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}

export default App;
