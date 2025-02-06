import User from '@/interfaces/User';
import UserService from '@/services/UserService';
import FormRegister from '@/interfaces/FormRegister';
import useError from './useError';

interface UserRegister {
    onFinally?: () => void,
    onStart?: () => void,
    onSuccess: (user:User) => void, 
    onError?: () => void,
}

const userService = new UserService();

export default function useRegister({onStart, onSuccess, onError, onFinally}:UserRegister) {
    const handleError = useError();
    return ({name, gender, dateOfBirth, email, password, countryId, artisticName, debutYear, biography}: FormRegister) => {
        onStart?.();
        userService.create({
            userDTO: {name, gender, dateOfBirth, email, password, countryId},
            artistDTO: {name: artisticName, debutYear, biography},
        }).then(response => onSuccess(response.data))
        .catch(error => {
            onError?.()
            handleError(error);
        })
        .finally(onFinally);
    };
}
