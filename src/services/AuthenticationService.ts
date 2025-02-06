import axios from "axios";
import { BASE_URL } from "./api";
import Session from "@/interfaces/Session";
import Authentication, { AuthenticationDTO } from "@/interfaces/Authentication";


export default class AuthenticationService {
    private static LOGIN_URL: string = `${BASE_URL}/login`;
    private static REFRESH_TOKEN_URL: string = `${BASE_URL}/authentication`;
    
    login(authenticationDTO: AuthenticationDTO) {
        return axios.post<Authentication>(AuthenticationService.LOGIN_URL, authenticationDTO);
    }

    refreshToken() {
        return axios.get<Authentication>(`${AuthenticationService.REFRESH_TOKEN_URL}/refreshToken`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
        });
    }

    getSession() {
        return axios.get<Session>("/api/session");
    }
}