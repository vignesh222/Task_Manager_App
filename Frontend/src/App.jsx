/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import NotFound from './pages/NotFound';
import { toggleTheme } from './redux/reducers/themeReducer';
import TaskDashboard from './pages/TaskDashboard';
import PrivateRoute from './routes/PrivateRoute';
import "./App.css"
function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const themeObj = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={themeObj}>
    <CssBaseline />
    <Router>
      <Button onClick={() => dispatch(toggleTheme())}>Toggle Theme</Button>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={<PrivateRoute element={<TaskDashboard />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
