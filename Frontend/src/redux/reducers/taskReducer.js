// taskReducer.js

import { createSlice } from '@reduxjs/toolkit';
import { getTasks as getTasksAPI, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../../api/task'; // import your API functions

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all', // 'pending' | 'completed' | 'all'
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasksStart: (state) => {
      state.loading = true;
    },
    getTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload); // Ensure payload contains status
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Ensure payload contains updated task with status
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload); // Filter out the deleted task
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Export actions
export const { getTasksStart, getTasksSuccess, getTasksFailure, addTask, updateTask, deleteTask, setFilter } = taskSlice.actions;

// Async thunk for fetching tasks
export const getTasks = () => async (dispatch) => {
  dispatch(getTasksStart()); // Start loading
  try {
    const tasks = await getTasksAPI(); // Call the getTasks API function
    dispatch(getTasksSuccess(tasks)); // Dispatch success with tasks
  } catch (error) {
    dispatch(getTasksFailure(error.toString())); // Dispatch failure
  }
};

// Async thunk for adding a task
export const createTask = (taskData) => async (dispatch) => {
  try {
    const newTask = await addTaskAPI(taskData);
    dispatch(addTask(newTask)); // Dispatch action to add the task to the store
  } catch (error) {
    console.error(error);
  }
};

// Async thunk for updating a task
export const modifyTask = (taskId, updatedData) => async (dispatch) => {
  try {
    const updatedTask = await updateTaskAPI(taskId, updatedData);
    dispatch(updateTask(updatedTask)); // Dispatch action to update the task in the store
  } catch (error) {
    console.error(error);
  }
};

// Async thunk for deleting a task
export const removeTask = (taskId) => async (dispatch) => {
  try {
    await deleteTaskAPI(taskId); // Call delete API
    dispatch(deleteTask(taskId)); // Dispatch action to remove the task from the store
  } catch (error) {
    console.error(error);
  }
};

export default taskSlice.reducer;
