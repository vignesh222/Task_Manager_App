import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer';
import authReducer from './reducers/authReducer';
import themeReducer from './reducers/themeReducer';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});
