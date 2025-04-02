import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import TaskForm from '../Tasks/TaskForm';
import TaskList from '../Tasks/TaskList';

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const token = localStorage.getItem('jwtToken');

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(`Failed to fetch project details: ${response.statusText}`);
      const data = await response.json();
      setProject(data);
      console.log('Project details:', data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  if (!project) return <Typography>Loading project details...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Project: {project.name}
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          {project.owner && (
            <Typography variant="h6">Owner: {project.owner.username}</Typography>
          )}
          {project.collaborators && project.collaborators.length > 0 && (
            <Typography variant="body1">
              Collaborators: {project.collaborators.map((c) => c.username).join(', ')}
            </Typography>
          )}
          {/* Optionally add an Edit Project button here */}
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Edit Project
          </Button>
        </CardContent>
      </Card>
      {/* Task creation form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Task to this Project
        </Typography>
        <TaskForm projectId={project.id} />
      </Box>
      {/* Task list */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Tasks in this Project
        </Typography>
        <TaskList projectId={project.id} />
      </Box>
    </Box>
  );
}

export default ProjectDetail;