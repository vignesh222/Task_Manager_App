/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const TaskFormModal = ({ open, onClose, taskData, setTaskData, handleSaveTask, handleAddTask, editingTaskId }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingTaskId ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={taskData.status}
          onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="todo">Todo</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={editingTaskId ? handleSaveTask : handleAddTask} // Ensure correct method is called based on editing
          color="primary"
        >
          {editingTaskId ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
