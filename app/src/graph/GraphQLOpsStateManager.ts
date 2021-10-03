import { toast } from 'react-toastify';

const LOADING_NOTIFICATION_ID = 'loading-notification';

interface StatusMessages {
    loading: string,
    error: string,
}

export const graphQLStateManager = (loading: any, error: any, statusMessages: StatusMessages) => {
    if (loading) {
        toast.info(statusMessages.loading, { isLoading: true, toastId: LOADING_NOTIFICATION_ID });
    } else {
        setTimeout(() => {
            toast.dismiss(LOADING_NOTIFICATION_ID);
        }, 800);
    }

    if (error) {
        toast.error(statusMessages.error);
    }
}