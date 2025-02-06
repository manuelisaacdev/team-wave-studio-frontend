import useError from "./useError";
import LoginDTO from "@/interfaces/LoginDTO";
import Authentication from "@/interfaces/Authentication";
import AuthenticationService from "@/services/AuthenticationService";

interface UseAuthenticate {
    onFinally?: () => void,
    onStarting?: () => void,
    onError?: () => void,
    onSuccess: (authentication: Authentication) => void, 
}

const authenticationService = new AuthenticationService();

export default function useAuthenticate({onStarting, onSuccess, onError, onFinally}:UseAuthenticate) {
    const handleError = useError();
    return ({rememberMe, ...authenticationDTO}: LoginDTO) => {
        onStarting?.();
        authenticationService.login(authenticationDTO)
        .then(response => onSuccess(response.data))
        .catch(error => {
            onError?.()
            handleError(error);
        }).finally(onFinally);
    };
}
