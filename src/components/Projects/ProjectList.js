import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const token = localStorage.getItem('jwtToken');

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
      const data = await response.json();
      setProjects(data);
      console.log('Fetched projects:', data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    console.log('Creating project with name:', projectName);
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('JWT token is missing.');
      return;
    }
    const url = `http://localhost:8080/api/projects?name=${encodeURIComponent(projectName)}`;
    console.log('POST URL:', url);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Project creation failed: ${response.status} ${errorText}`);
      }
      const newProject = await response.json();
      console.log('Project created successfully:', newProject);
      setProjectName('');
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Projects
      </Typography>
      {/* Form to create a new project */}
      <Box component="form" onSubmit={createProject} sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Project Name"
          variant="outlined"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create Project
        </Button>
      </Box>
      {projects.length === 0 ? (
        <Typography>No projects available. Create one!</Typography>
      ) : (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  {project.owner && (
                    <Typography variant="body2" color="text.secondary">
                      Owner: {project.owner.username}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/projects/${project.id}`}
                    sx={{ mt: 2 }}
                  >
                    Open Project
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ProjectList;