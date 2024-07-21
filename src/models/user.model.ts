export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER'
}

export type UserModel = {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    role?: Role;
    address?: string;
    facebookAccountId?: string;
    googleAccountId?: string;
    avatarUrl?: string;
}