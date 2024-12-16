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
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', error: '' });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = form;

        if (password !== confirmPassword) {
            setForm((prevForm) => ({ ...prevForm, error: "Passwords don't match!" }));
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password); // Використовуємо ініціалізований auth
            setSuccess(true);
            setForm({ email: '', password: '', confirmPassword: '', error: '' });

            setTimeout(() => navigate('/login'), 2000); // Перенаправлення на сторінку входу через 2 секунди
        } catch (err) {
            setForm((prevForm) => ({ ...prevForm, error: err.message })); // Обробка помилок
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
                        Create Account
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
                            value={form.password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {form.error && <Alert severity="error">{form.error}</Alert>}
                        {success && <Alert severity="success">Registration successful!</Alert>}
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
                            Register
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/login')}
                        >
                            Already have an account? Sign in
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
