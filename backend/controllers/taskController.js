const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, status = "pending" } = req.body;
  const newTask = new Task({
    title,
    description,
    status,
    user: req.user._id,
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { title, description, status },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
