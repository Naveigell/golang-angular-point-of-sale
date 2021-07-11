import { ErrorModel } from './error.model';
import * as ErrorAction from './error.action';

export type Action = ErrorAction.All;

const initialState: ErrorModel = {
    message: 'Internal Server Error',
    code: 500
}

export function errorReducer(state: ErrorModel = initialState, action: Action) {
    switch (action.type) {
        case ErrorAction.SHOW_ERROR:
            return { ...action.payload };
        case ErrorAction.CLEAR_ERROR:
            return {
                message: null,
                code: -1
            };
    }

    return { ...state };
}
