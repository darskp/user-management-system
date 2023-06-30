import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import host, { token } from '../configBaseurl';
import { setError, setSelectedUser } from '../redux/actions/selectedUserActions';
import { Box } from '@mui/material';

// const selectedUser = {
//     username: 'john_doe',
//     fullName: 'John Doe',
//     email: 'john.doe@example.com',
// };

const UserDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const selectedUser = useSelector((state) => state.selectedUser.selectedUser);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${host}/retrive_update_user/${id}/`, {
                    headers: {
                        Authorization: token
                    }
                });
                dispatch(setSelectedUser(response.data))
            } catch (error) {
                dispatch(setError(error.message))
            }
        };

        fetchUserDetails();
    }, [id]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{ backgroundColor: 'white' }}
        >
            <Typography gutterBottom variant="h5" component="div" sx={{ py: 2, fontWeight: 'bold', fontSize: '2rem' }}>
                User Details
            </Typography>
            <Card>
                {selectedUser && (
                    <CardContent>
                        <Typography variant="body1">
                            Username: {selectedUser.username || '-'}
                        </Typography>
                        <Typography variant="body1">
                            Full Name: {selectedUser.fullName || '-'}
                        </Typography>
                        <Typography variant="body1">
                            Email: {selectedUser.email || '-'}
                        </Typography>
                    </CardContent>
                )}
            </Card>
        </Box>
    );
};

export default UserDetails;

