import { AlertModel } from './alert.model';
import * as AlertAction from './alert.action';

export type Action = AlertAction.All;

const initialState: AlertModel = {
    message: '',
    duration: 300,
    style: '',
    name: ''
}

export function alertReducer(state: AlertModel = initialState, action: Action) {
    switch (action.type) {
        case AlertAction.SHOW_ALERT:
            return { ...action.payload };
    }

    return { ...state };
}
