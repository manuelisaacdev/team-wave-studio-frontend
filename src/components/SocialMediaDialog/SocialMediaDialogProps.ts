import SocialMedia from "@/interfaces/SocialMedia";

export default interface SocialMediaDialogProps {
    open?: boolean,
    handleClose?: () => void,
    updateSocialMedia?: SocialMedia,
}