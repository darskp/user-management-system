import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import host, { token } from '../configBaseurl';
import { setCurrentUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // try {
            //     let data = {
            //         username: values.username,
            //         first_name: values.fullName.split(' ')[0],
            //         last_name: values.fullName.split(' ')[1],
            //         email: values.email,
            //         password: values.password,
            //         phone_number: values.phoneNumber,
            //     }
            //     const response = await axios.post(`${host}/register/`, data, {
            // headers: {
            // Authorization: token,
            // },
            // });
            //     dispatch(setCurrentUser(response));
            //     console.log(data)
            //     console.log(response)
            // } 
            try {
                // const data = {
                //     username: 'riya_aggarwal',
                //     first_name: 'Riya',
                //     last_name: 'Aggarwal',
                //     email: 'riya_aggarwal989@gmail.com',
                //     password: 'user1@123',
                //     phone_number: '9563256556',
                // };
                let data = {
                    username: values.username,
                    first_name: values.fullName.split(' ')[0],
                    last_name: values.fullName.split(' ')[1],
                    email: values.email,
                    password: values.password,
                    phone_number: values.phoneNumber,
                }
                const response = await axios.post(`${host}/register/`, data, {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log(response.data);
                navigate('/login');
            }
            catch (error) {
                console.log(error);
            }
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
                    Sign Up
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
                    label="Full Name"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullName && formik.errors.fullName ? true : false}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email ? true : false}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                    type="email"
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
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    variant="outlined"
                />
                <Button type="submit" variant="contained">
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Signup;
