import { Backdrop, Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as yup from 'yup';
import { ButtonPrimaryGrandient } from "../../../components/common/ButtonGrandient";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { login, loginWithSocial } from "../../../services/auth.service";
import { LoginRequestDto } from "../../../dtos/resquests/login.dto";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { LoginResponse } from "../../../dtos/responses/login-response";
import { saveToken } from "../../../services/token.service";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const validationLoginSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu')
});


const Login = () => {
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values: LoginRequestDto) => {
            try {
                setOpen(true);
                const response: ResponseSuccess<LoginResponse> = await login(values);
                saveToken(response.data);
                const responseUser: ResponseSuccess<UserModel> = await getUserByEmail(values.email);
                saveUserToLocalStorage(responseUser.data);
                console.log(responseUser.data);
                navigate("/home");
            } catch (error) {
                setOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setError('Email hoặc mật khẩu không đúng');
            }

        },
    })

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'primary.dark',
            height: '100vh'
        }}>
            <Box sx={{
                width: '40%',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                p: 2,
                gap: '12px',
                flexDirection: "column",
                borderRadius: '8px'
            }}>
                <Typography variant="h4" sx={{ color: 'black' }}>Login</Typography>
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    label="Email"
                    name="email"
                    type="email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                    helperText={formikLogin.touched.email && formikLogin.errors.email}
                />
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    label="Password"
                    name="password"
                    type="password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                    helperText={formikLogin.touched.password && formikLogin.errors.password}
                />
                {error && <Typography component={'span'} sx={{ color: 'red' }}>{error}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Link to="/auth/forgot-password"
                    style={{ color: 'blue', textDecoration: 'none' }}>
                        Forgot password?</Link>
                </Box>

                <ButtonPrimaryGrandient variant="contained" type="submit"
                    onClick={() => formikLogin.submitForm()    
                }>Login</ButtonPrimaryGrandient>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ color: 'black' }}>Or Sign In Using</Typography>
                    <Box>
                        <IconButton onClick={() => loginWithSocial('facebook')} >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton onClick={() => loginWithSocial('google')}  >
                            <GoogleIcon />
                        </IconButton>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ color: 'black' }}>Or Sign Up Using</Typography>
                    <Button onClick={()=> navigate('/auth/register')} variant="contained" sx={{color: 'white' }}>Register</Button>
                </Box>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default Login;