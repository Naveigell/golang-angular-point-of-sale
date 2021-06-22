import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderEffect } from './core/stores/orders/order.effect';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    title = 'frontend';
    public totalOrders = 0;

    constructor(private orderEffect: OrderEffect) {}

    ngOnInit() {
        this.orderEffect.addOrder$.subscribe((data) => {
            this.totalOrders = data.orders.length;
        })
    }
}
