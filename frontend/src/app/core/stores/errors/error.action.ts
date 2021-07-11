import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ErrorModel } from './error.model';

export const SHOW_ERROR         = '[ERROR] Error Show';
export const CLEAR_ERROR        = '[ERROR] Error Clear';

@Injectable()
export class ShowError implements Action {
    readonly type = SHOW_ERROR;
    constructor(
        public payload: ErrorModel
    ) {}
}

@Injectable()
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type All = ShowError | ClearError;
