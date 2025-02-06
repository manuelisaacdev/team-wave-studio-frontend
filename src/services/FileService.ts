import api, { BASE_URL } from "./api";
import FileType from "@/interfaces/FileType";
import FileUploaded from "@/interfaces/FileUploaded";

export default class FileService {
    private static URL = "/resources";
    private static IMAGE_URL = `${this.URL}/images`;
    private static UPLOAD_URL = `${this.URL}/upload`;

    private resolve(ownerId:string, file:File, fileType:FileType):FormData {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("ownerId", ownerId);
        formData.append("fileType", fileType);
        return formData;
    }

    updateUserProfilePicture(userId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(userId, file, FileType.USER_PROFILE_PICTURE));
    }

    updateUserCoverPicture(userId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(userId, file, FileType.USER_COVER_PICTURE));
    }

    updatePlaylistCover(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.PLAYLIST_COVER));
    }

    updateAlbumCover(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.ALBUM_COVER));
    }

    updateMusicCover(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.MUSIC_COVER));
    }

    updateMusicAudio(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.MUSIC_AUDIO));
    }

    updateClipThumnail(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.CLIP_THUMBNAIL));
    }

    updateClipVideo(playlistId:string, file: File) {
        return api.post<FileUploaded>(FileService.UPLOAD_URL, this.resolve(playlistId, file, FileType.CLIP_VIDEO));
    }

    static resources(filename:string) {
        return `${BASE_URL + this.IMAGE_URL}/${filename}`;
    }
};
