// src/components/Auth/Register.js
import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Registration failed: ${errorText}`);
            }
            const data = await response.json();
            console.log('Registration successful:', data);
            onRegister(data);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <Box component="form" onSubmit={registerUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Register;