import axios from "axios";
import { BASE_URL } from "./api";
import User from "@/interfaces/User";
import Recovery, { RecoveryConfirmationDTO, RecoveryDTO } from "@/interfaces/Recovery";

export default class RecoveryService {
    private static URL = "/recovery";

    recovery(recoveryDTO: RecoveryDTO) {
        return axios.post<Recovery>(BASE_URL + RecoveryService.URL, recoveryDTO);
    }

    confirmation({token, ...data}: RecoveryConfirmationDTO) {
        return axios.post<User>(`${BASE_URL + RecoveryService.URL}/confirmation`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}