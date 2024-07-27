import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { resetPassword, sendEmailForgotPassword, verifyOtpForgotPassword } from '../../../services/auth.service';
import { VerifyEmailDto } from '../../../dtos/resquests/verify-email.dto';
import { LoginResponse } from '../../../dtos/responses/login-response';
import { ResponseSuccess } from '../../../dtos/responses/response.susscess';
import { saveToken } from '../../../services/token.service';
import { UserModel } from '../../../models/user.model';
import { getUserByEmail, saveUserToLocalStorage } from '../../../services/user.service';

const steps = ['Nhập email', 'Nhập OTP', 'Nhập mật khẩu mới'];

export default function ForgotPassword() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const [emailError, setEmailError] = React.useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep1 = async () => {
        try {
            await sendEmailForgotPassword(email);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleStep2 = async () => {
        try {
            const verifyEmail: VerifyEmailDto = {
                email: email,
                otp: otp
            }
            await verifyOtpForgotPassword(verifyEmail);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFinish = async () => {
        try {
            const resetPasswordRequest = {
                email: email,
                otpResetPassword: otp,
                newPassword: password
            }
            const response: ResponseSuccess<LoginResponse> = await resetPassword(resetPasswordRequest);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            saveToken(response.data);
            const responseUser: ResponseSuccess<UserModel> = await getUserByEmail(resetPasswordRequest.email);
            saveUserToLocalStorage(responseUser.data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }
    const renderBody = () => {
        switch (activeStep) {
            case 0:
                return (<Box sx={{ mt: 2 }}>
                    <Typography>Vui lòng nhập email của bạn:</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? "Email không hợp lệ" : ""}
                    />
                    <Button
                        color="inherit"
                        onClick={handleBack}
                        disabled={true}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button onClick={handleStep1}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>);
            case 1:
                return (<Box sx={{ mt: 2 }}>
                    <Typography>Vui lòng nhập mã xác thực đã gửi đến email của bạn:</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        required
                        type="text"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                    />
                    <Button
                        color="inherit"
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button onClick={handleStep2}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>);
            case 2:
                return (<Box sx={{ mt: 2 }}>
                    <Typography>Vui lòng nhập mật khẩu mới:</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        required
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        color="inherit"
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button onClick={handleFinish}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>);
            default:
                return <Box>Unknown step</Box>;
        }
    }

    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {renderBody()}
        </Container>
    );
}
