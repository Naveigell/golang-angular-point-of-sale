import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { OrderModel, OrdersModel } from './order.model';
import * as OrdersAction from './order.action';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderFacade {

    private readonly orders: Observable<OrdersModel>;

    constructor(public store: Store<AppState>) {
        this.orders = this.store.select('orders');
    }

    getOrders(){
        return this.orders;
    }

    removeOrder(index: number){
        this.store.dispatch(new OrdersAction.RemoveOrder(index))
    }

    addOrder({ id, name, quantity, price }){
        let order: OrderModel = {
            id,
            name,
            quantity,
            price
        };

        this.store.dispatch(new OrdersAction.AddOrder(order));
    }

    reloadOrder(){
        this.store.dispatch(new OrdersAction.GetOrder());
    }
}
