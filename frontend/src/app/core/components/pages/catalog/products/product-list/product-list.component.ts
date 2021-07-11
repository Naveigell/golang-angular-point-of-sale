import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../services/http/products.service';
import { ProductModel } from '../../../../../models/product';
import { currency } from '../../../../../../helpers/currency';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertEffect } from '../../../../../stores/alerts/alert.effect';
import { AlertFacade, AlertModel, PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_UPDATE } from '../../../../../stores/alerts';
import { alertTimeout } from '../../../../../utils/alert';
import { MovableRouter } from '../../../../../interfaces/router';

@Component({
    selector: 'app-product',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, MovableRouter {

    public products: ProductModel[] = [];
    public currency = currency;
    public showAlert = false;
    public alertOption: AlertModel;

    public deleteComponent = {
        index: -1,
    };

    public showComponent = {
        index: -1
    };

    constructor(
        private productsService: ProductsService,
        private alertEffect: AlertEffect,
        private alertFacade: AlertFacade,

        public router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    private retrieveProducts(){
        this.productsService.getProducts().subscribe((response: any) => {
            const { data }: { data: ProductModel[] } = response;

            this.products = data;
        });
    }

    public handleProductDeleted(event: any) {
        // if delete success, retrieve product
        // reduce server performance
        if (event.success) {
            this.retrieveProducts();
        }
        this.deleteComponent.index = -1;
    }

    ngOnInit() {
        this.retrieveProducts();
        this.alertFacade.getAlert().subscribe((alert) => this.handleAlert(alert));
        this.alertEffect.$shareAlert.subscribe((alert) => this.handleAlert(alert));
    }

    private handleAlert(alert: AlertModel){
        if ([PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_UPDATE].includes(alert.name)) {
            this.showAlert = true;
            this.alertOption = alert;

            alertTimeout(alert).then((response: boolean) => {
                this.showAlert = !response;
            });
        }
    }

    moveTo(obj: any) {
        this.router.navigate([obj.id], { relativeTo: this.activatedRoute }).then(() => undefined);
    }
}
