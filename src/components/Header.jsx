import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logoutUser } from '../redux/actions/userActions';
import host from '../configBaseurl';

const Header = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${currentUser}`
                }
            };

            await fetch(`${host}/api/logout`, requestOptions);
            dispatch(logoutUser());
            navigate('/login');
        } catch (error) {
            console.log('logout error', error);
        }
    };

    const showButton = () => {
        if (currentUser) {
            return (
                <Button onClick={handleLogout} variant="contained" color="primary">
                    Logout
                </Button>
            );
        }
        return (
            <>
                <Button component={Link} to="/signup" variant="contained" color="primary">
                    Signup
                </Button>
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Login
                </Button>
            </>
        );
    };

    return (
        <>
            <AppBar position="static" sx={{ px: 2 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: "white" }}>
                            User Management
                        </Link>                    </Typography>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        {showButton()}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
