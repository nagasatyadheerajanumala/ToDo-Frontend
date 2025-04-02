import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

function TaskForm({ projectId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const token = localStorage.getItem('jwtToken');

  const createTask = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, status: 'OPEN' };
    try {
      const response = await fetch(`http://localhost:8080/api/tasks?projectId=${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) throw new Error('Failed to create task');
      await response.json();
      // Clear form fields
      setTitle('');
      setDescription('');
      setDueDate('');
      // Optionally refresh the page or inform parent component to re-fetch tasks
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create New Task
        </Typography>
        <Box component="form" onSubmit={createTask} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskForm;