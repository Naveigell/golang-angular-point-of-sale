import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderEffect } from './core/stores/orders/order.effect';
import { Router } from '@angular/router';
import { ErrorEffect } from './core/stores/errors/error.effect';
import { ErrorFacade, ErrorModel } from './core/stores/errors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterContentChecked {

    public title = 'frontend';
    public totalOrders = 0;
    public globalError = false;

    constructor(
        private orderEffect: OrderEffect,
        private errorEffect: ErrorEffect,
        private errorFacade: ErrorFacade,

        private detector: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit() {
        this.orderEffect.watchOrders$.subscribe((data) => {
            this.totalOrders = data.orders.length;
        });

        this.errorEffect.$showError.subscribe((data: ErrorModel) => {
            this.globalError = data.code > 0;
        });
    }

    public payment(){
        this.router.navigate(['/pointofsale/payment']).then(r => undefined);
    }

    ngAfterContentChecked() {
        this.detector.detectChanges();
    }
}
