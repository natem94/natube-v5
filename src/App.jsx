import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Feed } from './components';
import Login from './auth/Login';
import Register from './auth/Register';
import Navbar from './components/Navbar';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Box sx={{ backgroundColor: '#000' }}>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Feed />} />
                            <Route path="/video/:id" element={<VideoDetail />} />
                            <Route path="/channel/:id" element={<ChannelDetail />} />
                            <Route path="/search/:searchTerm" element={<SearchFeed />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
