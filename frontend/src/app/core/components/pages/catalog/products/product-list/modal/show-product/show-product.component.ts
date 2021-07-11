import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from '../../../../../../../models/product';
import { ProductsService } from '../../../../../../../services/http/products.service';
import { currency } from '../../../../../../../../helpers/currency';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

    @Output() public modalClosed = new EventEmitter();
    @Input() public product: ProductModel;

    public currency = currency;

    constructor(
        private productService: ProductsService
    ) { }

    ngOnInit() {
        this.productService.retrieveProduct(this.product.id).subscribe((response: any) => {
            this.product = response.data;
            console.log(this.product)
        });
    }
}
