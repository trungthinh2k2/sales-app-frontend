import { apiUrl } from "../configurations/api-url";
import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { LoginResponse } from "../dtos/responses/login-response";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { LoginRequestDto } from "../dtos/resquests/login.dto";
import { RegisterRequestDto } from "../dtos/resquests/registerRequest.dto";
import { ResetPasswordRequest } from "../dtos/resquests/reset-password-request";
import { VerifyEmailDto } from "../dtos/resquests/verify-email.dto";

export const login = async (loginRequestDto: LoginRequestDto): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/login`,
            Method.POST,
            loginRequestDto,
            ContentType.JSON,
        );
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const register = async (registerRequestDto: RegisterRequestDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/register`,
            Method.POST,
            registerRequestDto,
            ContentType.JSON,
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const verifyEmail = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/verify-email`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const logout = async (accessToken: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/logout`,
            Method.POST,
            accessToken,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const sendEmailForgotPassword = async (email: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/send-verification-email/${email}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const verifyOtpForgotPassword = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/verify-email-otp-reset-password`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<ResponseSuccess<LoginResponse>> => { 
    try {
        const response = await requestConfig(
            `auth/reset-password`,
            Method.POST,
            resetPasswordRequest,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const loginWithSocial = (provider: string) => {
    window.location.href = `${apiUrl}/oauth2/authorization/${provider}`;
}