import { UserDTO } from "./User";
import { ArtistDTO } from "./Artist";

export default interface Register {
    userDTO: UserDTO,
    artistDTO: ArtistDTO,
}