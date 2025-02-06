import Label, { LabelDTO } from "@/interfaces/Label";
import AbstractService from "./AbstractService";
import api from "./api";

export interface QueryLabel {
    name?: string,
    albumId?: string,
}

export default class LabelService extends AbstractService<Label, QueryLabel, LabelDTO> {
    constructor() {
        super('/albums/labels');
    }
    
    create(albumId: string, labelDTO: LabelDTO) {
        return api.post<Label>(`${super.URL}/${albumId}`, labelDTO);
    }
};
