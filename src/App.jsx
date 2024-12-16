import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import Login from './containers/Login';
import Register from './containers/Register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Перевіряємо статус авторизації при завантаженні сторінки
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Box sx={{ backgroundColor: '#000' }}>
                {isAuthenticated ? (
                    <>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Feed />} />
                            <Route path="/video/:id" element={<VideoDetail />} />
                            <Route path="/channel/:id" element={<ChannelDetail />} />
                            <Route path="/search/:searchTerm" element={<SearchFeed />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )}
            </Box>
        </Router>
    );
};

export default App;
