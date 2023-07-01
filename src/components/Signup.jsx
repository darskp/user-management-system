import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import host, { token } from '../configBaseurl';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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
            const data = {
                username: values.username,
                first_name: values.fullName.split(' ')[0],
                last_name: values.fullName.split(' ')[1],
                email: values.email,
                password: values.password,
                phone_number: values.phoneNumber,
            };

            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Token 82de5b8e2cef34d2321bba25eae0ef6ab372c644");

            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: "follow",
            };

            try {
                const response = await fetch('http://65.2.51.31:9001/register/', options);
                const result = await response.json();
                if (result.status === 201) {
                    alert(result.message)
                    console.log(result.message);
                    navigate('/login');
                } else {
                    alert(result.message)
                }
            } catch (error) {
                console.log(error);
            }
        }


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
