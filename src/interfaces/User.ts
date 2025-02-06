export enum Gender {
    MALE="MALE",
    FEMALE="FEMALE",
}

export enum Role {
    USER="USER",
    ADMIN="ADMIN",
    ARTIST="ARTIST",
}

export interface UserDTO {
    name: string,
    email: string,
    gender: string,
    dateOfBirth: string,
    countryId: string,
    password: string,
}

export interface UpdateUserDTO {
    name: string,
    gender: string,
    dateOfBirth: string,
    countryId: string,
}

export interface UpdateUserEmailDTO {
    email: string,
    token: string,
    password: string,
}

export interface UpdateUserPasswordDTO {
    newPassword: string,
    currentPassword: string,
}

export interface ActivateAccountDTO {
    email: string,
    token: string,
}

export interface UserEmailDTO {
    email: string,
}

export interface RecoveryDTO {
    token: string,
    email: string,
    password: string,
}

export interface EmailToken {
    expiration: number,
}

export default interface User {
    id: string,
    name: string,
    email: string,
    gender: Gender,
    locked: boolean,
    deleted: boolean,
    verified: boolean,
    dateOfBirth: string,
    hasLoggedIn: boolean,
    profilePicture?: string,
    coverPicture?: string,
    countryId: string,
    artistId: string,
    roles: Role[],
}