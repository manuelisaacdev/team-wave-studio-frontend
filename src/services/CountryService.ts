import Country from "@/interfaces/Country";
import AbstractService from "./AbstractService";

export interface QueryCountry {
    name?: string,
    code?: string,
    phoneCode?: string,
}

export default class CountryService extends AbstractService<Country, QueryCountry, Object> {
    constructor() {
        super('/countries');
    }    
};
