// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProjectList from './components/Projects/ProjectList';
import ProjectDetail from './components/Projects/ProjectDetail';

function Navigation({ loggedInUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    onLogout();
    navigate('/login');
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              To-Do App
            </Link>
          </Typography>
          {loggedInUser ? (
              <>
                <Button color="inherit" component={Link} to="/projects">
                  Projects
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
          ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  return (
      <div>
        <Navigation loggedInUser={loggedInUser} onLogout={() => setLoggedInUser(null)} />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route
                path="/"
                element={
                  <Typography variant="h4" align="center">
                    Welcome to the To-Do App
                  </Typography>
                }
            />
            <Route path="/login" element={<Login onLogin={setLoggedInUser} />} />
            <Route path="/register" element={<Register onRegister={() => {}} />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
          </Routes>
        </Container>
      </div>
  );
}

export default App;