import User from "./User";

export interface AuthenticationDTO {
    email: string,
    password: string
}

export default interface Authentication {
    accessToken: string,
    refreshToken: string,
    user: User,
}