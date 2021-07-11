import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderFacade } from '../../../stores/orders';
import { ActionsSubject } from '@ngrx/store';
import { OrderEffect } from '../../../stores/orders/order.effect';
import { PointofsaleService } from '../../../services/http/pointofsale.service';
import { ProductModel } from '../../../models/product';
import { currency } from '../../../../helpers/currency';

@Component({
    selector: 'app-pointofsale',
    templateUrl: './pointofsale.component.html',
    styleUrls: ['./pointofsale.component.css']
})

export class PointofsaleComponent implements OnInit, OnDestroy {

    public count = 0;
    public orders = [];
    public total = 0;

    public currency = currency;

    public stuffs: ProductModel[] = [];

    constructor(
        private orderFacade: OrderFacade,
        private actionListener: ActionsSubject,
        private orderEffect: OrderEffect,
        private pointOfSaleService: PointofsaleService
    ) {}

    ngOnInit() {
        this.retrieveOrders();
        this.orderEffect.watchOrders$.subscribe((data) => {
            this.orders = data.orders;
            this.calculateTotal();
        });
    }

    private retrieveOrders(){
        this.pointOfSaleService.getProducts().subscribe((response: any) => {
            const { data }: { data: ProductModel[] } = response;

            this.stuffs = data;
        });
    }

    reloadOrder() {
        this.orderFacade.reloadOrder();
    }

    private calculateTotal(){
        this.total = this.orders.reduce((total, currValue) => {
            return Math.round(total + currValue.price * currValue.quantity);
        }, 0);
    }

    addOrder(index: number){
        if (index < 0 || index > this.stuffs.length) {
            return;
        }

        const { id, name, selling_price: price } = this.stuffs[index];
        this.orderFacade.addOrder({ id, name, quantity: 1, price });
    }

    removeOrder(index: number) {
        if (index < 0 || index > this.stuffs.length) {
            return;
        }

        this.orderFacade.removeOrder(index);
    }

    ngOnDestroy() {
        this.orderFacade.clearOrders();
    }
}
