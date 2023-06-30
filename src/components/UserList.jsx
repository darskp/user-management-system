import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Typography,Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import host, { token } from '../configBaseurl';
import { setError, setUserList } from '../redux/actions/userListActions';
import { useNavigate } from 'react-router-dom';

    // const userList = [
    //     {
    //         id: 1,
    //         username: 'jo',
    //         fullName: 'John Doe',
    //         email: 'john.doe@example.com',
    //     },
    //     {
    //         id: 2,
    //         username: 'jane_smith',
    //         fullName: 'Jane Smith',
    //         email: 'jane.smith@example.com',
    //     }
    // ];

const UserList = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const userList = useSelector((state) => state.userList.userList);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${host}/retrive_update_user/`, {
                    headers: {
                        Authorization: token
                    }
                });
                dispatch(setUserList(response.data));
            } catch (error) {
                console.error("Error - user list", error);
                dispatch(setError(error.message));
            }
        };
        fetchUsers();
    }, []);

    const handleViewUser = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{py:3}}>
                <Typography variant="h4" component="div" sx={{fontWeight:"bold"}}>
                    User List
                </Typography>
            </Box>
           <Box sx={{px:{md:5,xs:1}}}>
                <Table sx={{ border: "1px solid #C4C4C4" }}>
                    <TableHead sx={{
                        background: "#c9f29b"
                    }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            user.username !== currentUser?.username && (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username || "-"}</TableCell>
                                    <TableCell>{user.fullName || "-"}</TableCell>
                                    <TableCell>{user.email || "-"}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewUser(user.id)} variant="contained">View</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
           </Box>

        </div>
    );
};

export default UserList;
