/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  createTask,
  removeTask,
  modifyTask,
  setFilter,
} from "../redux/reducers/taskReducer";
import {
  Button,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
} from "@mui/material";
import TaskFormModal from "./TaskForm";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const filter = useSelector((state) => state.task.filter);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  const handleAddTask = () => {
    if (taskData.title && taskData.description) {
      dispatch(createTask(taskData));
      setTaskData({ title: "", description: "", status: "pending" });
      setShowFormModal(false);
      toast.success("Task added successfully!");
    } else {
      toast.error("Please fill in the task title and description.");
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
    toast.success("Task deleted successfully!");
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setShowFormModal(true);
  };

  const handleSaveTask = () => {
    if (editingTaskId) {
      dispatch(modifyTask(editingTaskId, taskData));
      setEditingTaskId(null);
      setShowFormModal(false);
      toast.success("Task updated successfully!");
    }
    setTaskData({ title: "", description: "", status: "pending" });
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  // Apply filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "todo":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" align="center" sx={{ margin: "20px 0" }}>
        Task Dashboard
      </Typography>

      {/* Filter Section */}
      <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "center" }}>
        <Button onClick={() => dispatch(setFilter("all"))}>All</Button>
        <Button onClick={() => dispatch(setFilter("todo"))}>Todo</Button>
        <Button onClick={() => dispatch(setFilter("pending"))}>Pending</Button>
        <Button onClick={() => dispatch(setFilter("completed"))}>
          Completed
        </Button>
      </Box>

      <Box sx={{ marginBottom: 3, width: "100%", maxWidth: "800px" }}>
        <Button
          onClick={() => setShowFormModal(true)}
          fullWidth
          variant="contained"
        >
          Add Task
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <TableContainer sx={{ maxWidth: "800px" }}>
            <Table aria-label="task table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell
                        style={{
                          color: getStatusColor(task.status),
                          fontWeight: "bold",
                        }}
                      >
                        {task.status}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditTask(task)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteTask(task._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No tasks available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* TaskFormModal Component */}
      <TaskFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        taskData={taskData}
        setTaskData={setTaskData}
        handleSaveTask={handleSaveTask}
        handleAddTask={handleAddTask}
        editingTaskId={editingTaskId}
      />
      <ToastContainer />
    </Container>
  );
};

export default TaskDashboard;
