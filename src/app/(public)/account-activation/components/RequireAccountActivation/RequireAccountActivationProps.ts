import { EmailToken, UserEmailDTO } from "@/interfaces/User";

export default interface RequireAccountActivationProps {
    email?: string,
    handleSuccess: (data: UserEmailDTO & EmailToken) => void,
}