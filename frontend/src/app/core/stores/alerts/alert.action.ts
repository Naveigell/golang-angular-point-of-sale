import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AlertModel } from './alert.model';

export const SHOW_ALERT             = '[ALERTS] Alerts Show';

export const PRODUCT_ADDED          = '[PRODUCTS] Product Added';

@Injectable()
export class ShowAlert implements Action{
    readonly type = SHOW_ALERT;
    constructor(public payload: AlertModel) {}
}

export type All = ShowAlert;
