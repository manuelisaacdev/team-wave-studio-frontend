export const AUDIO = [".mp3"];
export const VIDEO = [".mp4"];
export const IMAGES = [".png",".jpeg",".jpg",".webp"];

const MIMETYPES = {
    audio: AUDIO.join(","),
    video: VIDEO.join(","),
    image: IMAGES.join(","),
}

export default MIMETYPES;