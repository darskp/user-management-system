import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import host, { token } from '../configBaseurl';
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
        onSubmit: async (values) => {
            let data = {
                username: values.username,
                password: values.password,
            };

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Token 82de5b8e2cef34d2321bba25eae0ef6ab372c644");

            var options = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: "follow",
            };
            console.log(options);

            try {
                const response = await fetch(`http://65.2.51.31:9001/login/`, options);
                const result = await response.json();
                if (result.status === 200) {
                    alert(result.message);
                    dispatch(setCurrentUser(values.username, result.token));
                    navigate('/users');
                }
                else {
                    alert(result.message)
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

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
                    label="Email"
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
