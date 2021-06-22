import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ADD_ORDER, REMOVE_ORDER } from './order.action';
import { OrderFacade } from './order.facade';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class OrderEffect {
    addOrder$ = createEffect(() => {
            return this.action.pipe(
                ofType(ADD_ORDER, REMOVE_ORDER),
                concatMap(() => {
                    return this.orderService.getOrders().pipe(
                        map((orders) => {
                            return orders;
                        }),
                    )
                })
            );
        },
        { dispatch: false }
    )

    constructor(private action: Actions, private orderService: OrderFacade) {}
}
