import axios from "axios";
import api, { BASE_URL } from "./api";
import Register from "@/interfaces/Register";
import AbstractService from "./AbstractService";
import User, { UserEmailDTO, ActivateAccountDTO, UpdateUserDTO, UpdateUserEmailDTO, UpdateUserPasswordDTO, EmailToken, RecoveryDTO } from "@/interfaces/User";

export interface QueryUser {
    name?: string,
    gender?: string,
    email?: string,
    countryId?: string,
}

export default class UserService extends AbstractService<User, QueryUser, UpdateUserDTO> {
    private static URL = "/users";

    constructor() {
        super("/users");
    };
    
    findByEmail(email: string) {
        return api.get<User>(`${UserService.URL}/email/${email}`);
    }

    create(register:Register) {
        return axios.post<User>( `${BASE_URL + UserService.URL}/artist`, register);
    }

    updatePassword(userId: string, updateUserPasswordDTO: UpdateUserPasswordDTO) {
        return api.patch<User>(`${UserService.URL}/password/${userId}`, updateUserPasswordDTO);
    }

    // Update email
    updateEmail(userId: string, {token, ...data}: UpdateUserEmailDTO) {
        return axios.patch<User>(`${BASE_URL +UserService.URL}/email/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    requireUpdateEmail(userEmailDTO: UserEmailDTO) {
        return api.post<EmailToken>(`${UserService.URL}/email`, userEmailDTO);
    }

    // Activate account
    activateAccount({token, ...data}:ActivateAccountDTO) {
        return axios.patch<User>(`${BASE_URL + UserService.URL}/activation`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    requireAccountActivation(userEmailDTO: UserEmailDTO) {
        return axios.post<EmailToken>(`${BASE_URL + UserService.URL}/activation`, userEmailDTO);
    }

    // Recovery account
    recovery({token, ...data}: RecoveryDTO) {
        return axios.patch<User>(`${BASE_URL + UserService.URL}/recovery`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    requireRecovery(userEmailDTO: UserEmailDTO) {
        return axios.post<EmailToken>(`${BASE_URL + UserService.URL}/recovery`, userEmailDTO);
    }
    
};
