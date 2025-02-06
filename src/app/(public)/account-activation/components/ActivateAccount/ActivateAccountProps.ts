import { EmailToken } from "@/interfaces/User";

export default interface ActivateAccountProps extends EmailToken {
    email: string,
    password?: string,
    handleTimeout: () => void,
}