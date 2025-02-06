import Recovery, { RecoveryDTO } from "@/interfaces/Recovery";

export default interface FormRecoverProps {
    handleConfirm: (confirm: Recovery & RecoveryDTO) => void,
}