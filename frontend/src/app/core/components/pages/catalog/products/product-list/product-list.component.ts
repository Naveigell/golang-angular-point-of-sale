import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../services/http/products.service';
import { StuffModel } from '../../../../../models/stuff';
import { currency } from '../../../../../../helpers/currency';
import { Router } from '@angular/router';
import { AlertEffect } from '../../../../../stores/alerts/alert.effect';
import { AlertFacade, AlertModel, PRODUCT_ADDED } from '../../../../../stores/alerts';
import { alertTimeout } from '../../../../../utils/alert';

@Component({
    selector: 'app-product',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public stuffs: StuffModel[] = [];
    public currency = currency;
    public showAlert = false;
    public alertOption: AlertModel;

    constructor(
        private productsService: ProductsService,
        private alertEffect: AlertEffect,
        private alertFacade: AlertFacade,

        public router: Router
    ) {}

    private retrieveProducts(){
        this.productsService.getProducts().subscribe((response: any) => {
            const { data }: { data: StuffModel[] } = response;

            this.stuffs = data;
        });
    }

    ngOnInit() {
        this.retrieveProducts();
        this.alertFacade.getAlert().subscribe((alert) => {
            if (alert.name === PRODUCT_ADDED) {
                this.showAlert = true;
                this.alertOption = alert;

                alertTimeout(alert).then((response: boolean) => {
                    this.showAlert = !response;
                });
            }
        })
    }
}
