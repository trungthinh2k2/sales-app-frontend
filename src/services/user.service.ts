import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { Role, UserModel } from "../models/user.model";

export const getUserByEmail = async (email: string) : Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const saveUserToLocalStorage = (user: UserModel) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const isLoginAccount = (role?: Role) : boolean => {
    const user : UserModel | null = getUserFromLocalStorage();
    if(user) {
        return role ? user.role === role : true;
    }
    return false;
}

export const getUserFromLocalStorage = () : UserModel | null => { 
    const userStr : string | null = localStorage.getItem('user');
    if(userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

export const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}