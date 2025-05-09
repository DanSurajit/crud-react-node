import { Pencil, Trash2, Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Home() {
  interface Task {
    id: number;
    task: string;
  }

  const [val, setVal] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      if (data) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (val) {
      try {
        const requestBody = { task: val };
        await fetch("http://localhost:3001/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        setVal("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      console.log("Task is required");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch("http://localhost:3001/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditValue(task.task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditValue("");
  };

  const handleUpdateTask = async (id: number) => {
    if (editValue.trim() === "") {
      return;
    }

    try {
      await fetch("http://localhost:3001/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, task: editValue }),
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="mb-10 mt-5 max-w-7xl mx-auto">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Enter a new task"
          />
          <button
            type="submit"
            className="bg-gradient-to-tr from-blue-700 to-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:from-blue-800 hover:to-blue-600 transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tasks</h1>
        <section className="space-y-6 text-black">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex gap-8 items-center border-b pb-4">
                {editingTask === task.id ? (
                  <div className="flex-1 flex items-center gap-4">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateTask(task.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">{task.task}</div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}