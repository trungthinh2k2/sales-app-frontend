import { Backdrop, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { RegisterRequestDto } from "../../../dtos/resquests/registerRequest.dto";
import { ButtonPrimaryGrandient } from "../../../components/common/ButtonGrandient";
import { register } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RegisterForm = RegisterRequestDto & {
    confirmPassword: string
}
const validationRegisterSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    name: yup.string().required('Vui lòng nhập họ và tên'),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    phoneNumber: yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
});

const Register = () => {
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState("");

    const formikRegister = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            phoneNumber: ''
        },
        validationSchema: validationRegisterSchema,
        onSubmit: async (values: RegisterForm) => {
            const userRegisterDto: RegisterRequestDto = values;
            try {
                await register(userRegisterDto);
                navigate("/auth/verify-email?email=" + userRegisterDto.email);
            } catch (error) {
                setErrorEmail("Email đã được sử dụng");
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
                <Typography variant="h4" sx={{ color: 'black' }}>Register</Typography>
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    label="Email"
                    name="email"
                    value={formikRegister.values.email}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.email && Boolean(formikRegister.errors.email)}
                    helperText={formikRegister.touched.email && formikRegister.errors.email}
                />
                {errorEmail && <Typography color={"error"} component={"span"}>{errorEmail}</Typography>}

                <TextField
                    sx={{
                        width: '80%'
                    }}
                    label="Họ và tên"
                    name="name"
                    value={formikRegister.values.name}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
                    helperText={formikRegister.touched.name && formikRegister.errors.name}
                />
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    value={formikRegister.values.password}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                    helperText={formikRegister.touched.password && formikRegister.errors.password}
                />
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    type="password"
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={formikRegister.values.confirmPassword}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.confirmPassword && Boolean(formikRegister.errors.confirmPassword)}
                    helperText={formikRegister.touched.confirmPassword && formikRegister.errors.confirmPassword}
                />
                <TextField
                    sx={{
                        width: '80%'
                    }}
                    label="Số điện thoại"
                    type="tel"
                    name="phoneNumber"
                    value={formikRegister.values.phoneNumber}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.phoneNumber && Boolean(formikRegister.errors.phoneNumber)}
                    helperText={formikRegister.touched.phoneNumber && formikRegister.errors.phoneNumber}
                />
                <ButtonPrimaryGrandient variant="contained" type="submit"
                    onClick={() => formikRegister.submitForm()
                    }>Register</ButtonPrimaryGrandient>
            </Box>
            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
        </Container>
    )


}

export default Register;