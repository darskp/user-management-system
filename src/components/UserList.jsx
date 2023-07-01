import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography,Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import host, { token } from '../configBaseurl';
import { setError, setUserList } from '../redux/actions/userListActions';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.token);
    const userList = useSelector((state) => state.userList.userList);
    const currentUserEmail = useSelector((state) => state.currentUser.email);
    let navigate = useNavigate();
    console.log(currentUser)

    const handleViewUser = (id) => {
        navigate(`/users/${id}`);
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchUsers = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${currentUser}`
                    }
                };

                const response = await fetch(`http://65.2.51.31:9001/retrive_update_user/`, options);
                // const response = await fetch(`https://jsonplaceholder.typicode.com/users`, options);
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setUserList(data));
                } else {
                    throw new Error("Failed to fetch user list");
                }
            } catch (error) {
                console.error("Error - user list", error);
                dispatch(setError(error.message));
            }
        };

        fetchUsers();
    }, [dispatch, currentUser,navigate]);

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
                        {userList.filter(user => user.email !== currentUserEmail).map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username || "-"}</TableCell>
                                    <TableCell>{user.first_name + user.last_name || "-"}</TableCell>
                                    <TableCell>{user.email || "-"}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleViewUser(user.id)} variant="contained">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </Table>
           </Box>

        </div>
    );
};

export default UserList;
