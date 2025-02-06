import api from "./api";
import AbstractService from "./AbstractService";
import MusicalGenre from "@/interfaces/MusicalGenre";
import { PageRequest } from "@/interfaces/PageRequest";
import Pagination, { Sort } from "@/interfaces/Pagination";

export interface QueryMusicalGenre {
    name?: string,
}

export default class MusicalGenreService extends AbstractService<MusicalGenre, QueryMusicalGenre, Object> {
    constructor() {
        super("/musical-genres");
    }
};
