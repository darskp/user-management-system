import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import host, { token } from '../configBaseurl';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        // onSubmit: async (values) => {
        //     try {
        //         let data={
        //             username: values.username,
        //             password: values.password,
        //         };
        //         const response = await axios.post(`${host}/login/`, data, {
        //             headers: {
        //                 Authorization: token,
        //             },
        //         });
        //         dispatch(setCurrentUser(response.data));
        //         navigate('/user-list');
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        onSubmit: (values) => {
            let data = {
                username: values.username,
                password: values.password,
            };

            fetch(`${host}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Login failed');
                    }
                })
                .then((responseData) => {
                    dispatch(setCurrentUser(responseData));
                    navigate('/users');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

    return (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '80vh', backgroundColor: 'white' }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
                onSubmit={formik.handleSubmit}
            >
                <Typography variant="h3" component="div" sx={{ py: 2 }}>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && formik.errors.username ? true : false}
                    helperText={formik.touched.username && formik.errors.username}
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                    type="password"
                />
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
