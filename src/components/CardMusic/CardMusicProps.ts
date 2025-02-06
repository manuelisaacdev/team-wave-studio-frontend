import Music from "@/interfaces/Music";

export default interface CardMusicProps {
    music: Music,
    placementTop?: boolean,
    handleToUpdateMusic?: (music: Music) => void,
    handleRemoveMusic?: (music: Music, onFinish: () => void) => void,
    handleUpdateCover?: (music: Music, file: File, onFinish: () => void) => void,
    handleUpdateAudio?: (music: Music, file: File, onFinish: () => void) => void,
}