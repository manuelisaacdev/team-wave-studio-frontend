import { AxiosError } from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { notification } from '@/redux/slicer/notificationSlicer';

interface Argument {
    codes: string[],
    arguments?: string,
    defaultMessage: string,
    code: string
}

interface Error {
    codes: string[],
    arguments: Argument[],
    defaultMessage: string,
    objectName: string,
    field: string,
    rejectedValue: null | string | number,
    bindingFailure: boolean,
    code: string
}

interface ErrorResponse {
    timestamp: string,
    status: number,
    error: string,
    errors?: Error[],
    message?: string,
    messages?: string,
    path: string,
}

export default function useError() {
    const dispatch = useAppDispatch();
    return (error: AxiosError<ErrorResponse>) => {
        console.log("ERROR: ", error);
        if(error.response?.data.message) {
            dispatch(notification.error({message: error.response.data.message}));
        } else if(error.response?.data.messages) {
            dispatch(notification.error({message: error.response.data.messages}));
        } else if(error.message) {
            dispatch(notification.error({message: error.message}));
        } else {
            dispatch(notification.error({message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'}));
        }
    }
}
