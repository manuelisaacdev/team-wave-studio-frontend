import api from "./api";
import AbstractService from "./AbstractService";
import SocialMedia, { SocialMediaDTO, SocialMediaType } from "@/interfaces/SocialMedia";

export interface QuerySocialMedia {
    artistId?: string;
    socialMediaType?: SocialMediaType,
}

export default class SocialMediaService extends AbstractService<SocialMedia, QuerySocialMedia, SocialMediaDTO> {

    constructor() {
        super("/artists/social-media");
    }

    create(artistId: string, socialMediaDTO:SocialMediaDTO) {
        return api.post<SocialMedia>(`${super.URL}/${artistId}`, socialMediaDTO);
    }

};
