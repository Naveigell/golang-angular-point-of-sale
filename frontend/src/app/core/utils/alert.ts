import { AlertModel } from '../stores/alerts';

export const alertTimeout = async (alert: AlertModel) => {
    return new Promise(((resolve) => {
        if (alert.duration > 0) {
            setTimeout(() => {
                resolve(true);
            }, alert.duration);
        } else {
            resolve(false);
        }
    }));
}
