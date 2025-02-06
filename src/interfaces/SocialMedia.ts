import { IconType } from "react-icons";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebook, FaSoundcloud, FaSpotify, FaTiktok } from "react-icons/fa";

export enum SocialMediaType {
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    YOUTUBE = 'YOUTUBE',
    SPOTIFY = 'SPOTIFY',
    APPLE_MUSIC = 'APPLE_MUSIC',
    SOUNDCLOUD = 'SOUNDCLOUD',
    TIKTOK = 'TIKTOK',
    X = 'X'
}

export const SOCIAL_MEDIAS_DATA: Record<SocialMediaType, {label: string, Icon: IconType, key:SocialMediaType}> = {
    INSTAGRAM: {label: 'Instagram', Icon: PiInstagramLogoFill, key: SocialMediaType.INSTAGRAM},
    FACEBOOK: {label: 'Facebook', Icon: FaFacebook, key: SocialMediaType.FACEBOOK},
    YOUTUBE: {label: 'Youtube', Icon: FaYoutube, key: SocialMediaType.YOUTUBE},
    SPOTIFY: {label: 'Spotify', Icon: FaSpotify, key: SocialMediaType.SPOTIFY},
    APPLE_MUSIC: {label: 'Apple Music', Icon: SiApplemusic, key: SocialMediaType.APPLE_MUSIC},
    SOUNDCLOUD: {label: 'SoundCloud', Icon: FaSoundcloud, key: SocialMediaType.SOUNDCLOUD},
    TIKTOK: {label: 'Tiktok', Icon: FaTiktok, key: SocialMediaType.TIKTOK},
    X: {label: 'X', Icon: FaXTwitter, key: SocialMediaType.X},
};

export interface SocialMediaDTO {
    url: string,
    socialMediaType: string,
}

export default interface SocialMedia {
    id: string,
    url: string,
    createdAt: string,
    socialMediaType: SocialMediaType,
}