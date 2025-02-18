# Task Manager Application

A full-stack task management application built with React (Frontend) and Node.js/Express (Backend). This application allows users to create, read, update, and delete tasks, with user authentication and a responsive interface.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete Tasks
- Task Status Management (Todo, Pending, Completed)
- Responsive Material-UI Design
- Dark/Light Theme Toggle
- Secure JWT Authentication
- RESTful API Architecture

## Project Structure


Task_Manager_App/
├── Frontend/         # React frontend application
└── backend/         # Node.js/Express backend application


## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Quick Start

1. Clone the repository:
bash
git clone <repository-url>
cd Task_Manager_App


2. Set up the backend:
bash
cd backend
npm install
cp .env.example .env    # Configure your environment variables
npm start


3. Set up the frontend:
bash
cd ../Frontend
npm install
npm run dev


4. Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Detailed Setup Instructions

Please refer to the individual README files in the Frontend and backend directories for detailed setup instructions:

- [Frontend Setup](./Frontend/README.md)
- [Backend Setup](./backend/README.md)

## Testing the Application

### 1. User Authentication
1. Register a new account:
   - Click "Sign Up" on the login page
   - Enter your email and password
   - Submit the registration form

2. Login to your account:
   - Enter your registered email and password
   - Click "Sign In"

### 2. Task Management

#### Creating Tasks
1. Click "Add Task" button
2. Fill in the task details:
   - Title: Enter task name
   - Description: Add task details
   - Status: Select from (Todo, Pending, Completed)
3. Click "Add" to create the task

#### Viewing Tasks
1. Use the filter buttons to view different task categories:
   - "All" - Shows all tasks
   - "Todo" - Shows only todo tasks
   - "Pending" - Shows tasks in progress
   - "Completed" - Shows finished tasks

#### Updating Tasks
1. Find the task you want to update
2. Click "Edit" button
3. Modify the task details:
   - Update title/description
   - Change status
4. Click "Save" to update the task

#### Deleting Tasks
1. Locate the task to delete
2. Click "Delete" button
3. Confirm deletion when prompted

### 3. Theme Testing
- Click the "Toggle Theme" button to switch between light and dark modes
- Verify that the UI updates accordingly

## Technical Testing

1. Backend Testing:
- Ensure MongoDB is running
- Use Postman or similar tools to test API endpoints
- Run backend tests: cd backend && npm test

2. Frontend Testing:
- Run frontend tests: cd Frontend && npm test
