import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from './order.state';
import { OrderModel, OrdersModel } from './order.model';
import * as OrdersAction from './order.action';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderFacade {

    private readonly orders: Observable<OrdersModel>;
    private readonly STORE_NAME = 'orders';

    constructor(public store: Store<OrderState>) {
        this.orders = this.store.select(this.STORE_NAME);
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
