import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from '../../../../../../../models/product';
import { ProductsService } from '../../../../../../../services/http/products.service';
import { AlertFacade, AlertModel, PRODUCT_DELETE } from '../../../../../../../stores/alerts';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

    @Output() private productDeleted = new EventEmitter();
    @Output() public modalClosed = new EventEmitter();
    @Input() public product: ProductModel;

    public loading = false;

    constructor(
        private productService: ProductsService,
        private alertFacade: AlertFacade
    ) { }

    ngOnInit() {}

    public async deleteProduct(){
        this.loading = true;

        // using promise to make loading style work
        new Promise(((resolve, reject) => {
            this.productService.deleteProduct(this.product.id).subscribe(
                () => {
                    const alert: AlertModel = {
                        name: PRODUCT_DELETE,
                        duration: -1,
                        message: 'Product delete successfully',
                        style: 'alert alert-success'
                    };
                    this.alertFacade.shareAlert(alert);
                    resolve();
                },
                () => {
                    reject();
                }
            );
        })).then(() => this.handleDeletedProduct(true))
           .catch(() => this.handleDeletedProduct(false));
    }

    private handleDeletedProduct(success: boolean){
        this.loading = false;
        this.productDeleted.emit({ success });
    }
}
