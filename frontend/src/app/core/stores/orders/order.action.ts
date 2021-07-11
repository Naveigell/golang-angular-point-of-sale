import { Action } from '@ngrx/store';
import { OrderModel } from './order.model';
import {Injectable} from '@angular/core';

export const ADD_ORDER          = '[Orders] Order Add';
export const REMOVE_ORDER       = '[Orders] Order Remove';
export const GET_ORDER          = '[Orders] Order Get';
export const CLEAR_ORDER        = '[Orders] Order Clear';

@Injectable()
export class AddOrder implements Action {
    readonly type = ADD_ORDER;
    constructor(public payload: OrderModel){}
}

@Injectable()
export class RemoveOrder implements Action {
    readonly type = REMOVE_ORDER;
    constructor(public payload: number) {}
}

@Injectable()
export class ClearOrder implements Action {
    readonly type = CLEAR_ORDER;
}

@Injectable()
export class GetOrder implements Action {
    readonly type = GET_ORDER;
    constructor() {}
}

export type All = AddOrder | RemoveOrder | GetOrder | ClearOrder;
