# MERN To-Do List — Assignment 2

## Student Details
Name: Gayathri S Nair
Roll Number: 31
Course: Web Technology (23CSB40B)

## Description
A full-stack To-Do List application built using MongoDB, Express,
React, and Node.js. Users can add tasks, mark them complete or
incomplete, and delete them without a full page reload.
Tasks are stored in MongoDB and remain after refreshing the page.
The backend also supports editing task titles through its PUT endpoint.

## Technologies
- React with Vite
- Node.js and Express
- MongoDB and Mongoose
- CSS
- Fetch API

## Requirements
- Node.js and npm
- MongoDB Community Server installed and running
- A web browser

## Run the Backend
Open a terminal in the project folder:

```bash
cd backend
npm install
```

Create a file named `.env` inside `backend` containing:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
```

Start the backend:

```bash
npm start
```

Backend URL: http://localhost:5000

## Run the Frontend
Keep the backend running. Open another terminal in the project folder:

```bash
cd frontend
npm install
npm run dev
```

Open the Local URL shown in the terminal, normally:
http://localhost:5173

## API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Add a task |
| PUT | /api/tasks/:id | Update title or completion status |
| DELETE | /api/tasks/:id | Delete a task |

POST accepts a JSON body containing `title`.
PUT accepts `title`, `completed`, or both.

## Task Model
- title: String, required
- completed: Boolean, defaults to false
- createdAt: Date, defaults to the creation time

## Manual Testing
- Added tasks through the React form.
- Marked tasks complete and incomplete.
- Deleted a task.
- Refreshed the page to confirm saved changes persist.
- Checked that blank task titles are rejected.

## Screenshots
Screenshots are included in the `screenshots` folder:
- 01_tasks_added.png
- 02_task_completed.png
- 03_task_deleted.png