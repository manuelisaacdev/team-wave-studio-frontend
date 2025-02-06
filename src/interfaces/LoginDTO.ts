import { AuthenticationDTO } from "./Authentication";

export default interface LoginDTO extends AuthenticationDTO {
    rememberMe?: boolean;
}