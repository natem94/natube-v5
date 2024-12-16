import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Paper,
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = ({ setIsAuthenticated }) => {
    const [form, setForm] = useState({ email: '', password: '', error: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true'); // Зберігаємо статус авторизації
            navigate('/');
        } catch (err) {
            setForm((prevForm) => ({ ...prevForm, error: 'Invalid email or password' }));
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true'); // Зберігаємо статус авторизації
            navigate('/');
        } catch (err) {
            setForm((prevForm) => ({ ...prevForm, error: 'Google login failed' }));
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <YouTubeIcon sx={{ fontSize: 50, color: 'red', mb: 1 }} />
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleEmailLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={form.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleInputChange}
                        />
                        {form.error && <Alert severity="error">{form.error}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: 'red',
                                '&:hover': { bgcolor: 'darkred' },
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={handleGoogleLogin}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/register')} 
                    >
                        Don’t have an account? Register here
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
