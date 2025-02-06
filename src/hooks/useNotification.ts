import { useAppDispatch } from '@/redux/hooks';
import { notification, NotificationPayload } from '@/redux/slicer/notificationSlicer';

interface NotificationHook {
    info: (payload: NotificationPayload) => void;
    error: (payload: NotificationPayload) => void;
    success: (payload: NotificationPayload) => void;
    warning: (payload: NotificationPayload) => void;
    close: () => void;
}

export default function useNotification():NotificationHook {
    const dispatch = useAppDispatch();
    return {
        info: (payload: NotificationPayload) => dispatch(notification.info(payload)),
        error: (payload: NotificationPayload) => dispatch(notification.error(payload)),
        success: (payload: NotificationPayload) => dispatch(notification.success(payload)),
        warning: (payload: NotificationPayload) => dispatch(notification.warning(payload)),
        close: () => dispatch(notification.close()),
    };
}
