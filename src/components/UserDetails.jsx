import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import host, { token } from '../configBaseurl';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    let [selectedUser, setUser] = useState({})
    const currentUser = useSelector((state) => state.currentUser);
    console.log(currentUser)
    let navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Token ${currentUser}`);

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                };

                const response = await fetch(`http://65.2.51.31:9001/retrive_update_user/${id}/`, requestOptions);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                } else {
                    throw new Error("Failed to fetch user details");
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchUserDetails();
    }, [currentUser, id, navigate]);


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

