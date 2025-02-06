import SocialMedia from "@/interfaces/SocialMedia";

export default interface CardSocialMediaProps {
    socialMedia: SocialMedia,
    handleUpdateSocialMedia: (socialMedia:SocialMedia) => void,
    handleRemoveSocialMedia: (socialMedia:SocialMedia, onFinally: () => void) => void,
}