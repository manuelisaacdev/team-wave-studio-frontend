import { EmailToken } from "@/interfaces/User";

export default interface RecoveryConfirmationFormProps extends EmailToken {
    email: string,
    handleTimeout: () => void,
}