import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Load saved tasks when the page opens.
  useEffect(() => {
    let active = true;

    async function loadTasks() {
      try {
        const data = await request(API_URL);
        if (active) setTasks(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTasks();

    return () => {
      active = false;
    };
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const newTask = await request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      setTasks((previous) => [newTask, ...previous]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleTask(task) {
    setBusy(true);
    setError("");

    try {
      const updatedTask = await request(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      setTasks((previous) =>
        previous.map((item) =>
          item._id === updatedTask._id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteTask(id) {
    setBusy(true);
    setError("");

    try {
      await request(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTasks((previous) => previous.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="todo-app">
      <h1>My To-Do List</h1>
      <p className="subtitle">Plan your day, one task at a time.</p>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          aria-label="New task"
          placeholder="What do you need to do?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={busy || loading}
        />
        <button type="submit" disabled={busy || loading}>
          Add Task
        </button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <p className="task-count">
            {tasks.length} tasks · {completedCount} completed
          </p>

          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add your first task!</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                      disabled={busy}
                    />
                    <span className={task.completed ? "completed" : ""}>
                      {task.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteTask(task._id)}
                    disabled={busy}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

export default App;