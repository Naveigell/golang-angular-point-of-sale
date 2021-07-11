import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../../../models/product';
import { ProductsService } from '../../../../../services/http/products.service';
import { file } from '../../../../../../helpers/file';
import { AlertFacade, PRODUCT_ADD, PRODUCT_UPDATE } from '../../../../../stores/alerts';
import { parseErrors, parseStringToNumberInObject } from '../../../../../../helpers/parse';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    @ViewChild('imageInput', { static: false })
    public imageInput: ElementRef<HTMLInputElement>;

    public product: ProductModel = {
        id: '',
        name: '',
        barcode: '',
        category: '',
        image: null,
        minimum_stock: 0,
        outlet: '',
        purchase_price: 0,
        selling_price: 0,
        sku: '',
        stock: 0
    };
    public errors = {
        name: null,
        sku: null,
        stock: null,
        category: null,
        minimum_stock: null,
        selling_price: null,
        purchase_price: null
    };
    public categories = ['smartphone', 'pc', 'printer', 'food'];
    public categoryModal = {
        open: false
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductsService,
        private alertFacade: AlertFacade,
        private router: Router
    ) {}

    ngOnInit() {
        this.product.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.retrieveProduct();
    }

    public chooseImage(){
        if (this.imageInput !== undefined) {
            this.imageInput.nativeElement.click();
        }
    }

    public imageChanged(target: any){
        file.fromFileToBase64(target.files[0]).then((response: string) => {
            this.product.image = response;

            // if image had been convert into base 64, then update image
            // in database
            const file = this.imageInput.nativeElement.files;
            if (file.length > 0) {
                const form = new FormData();
                form.append('image', file[0]);

                this.productService.updateProductImage(this.product.id, form).subscribe(
                    r => undefined,
                    response => console.error(response)
                )
            }
        }).catch((error) => {
            console.error(error)
        });
    }

    public updateProduct(){
        parseStringToNumberInObject(this.product, ['minimum_stock', 'purchase_price', 'selling_price', 'stock']);
        console.log(this.product)
        this.productService.updateProduct(this.product.id, this.product).subscribe(
            (response) => {
                this.alertFacade.shareAlert({
                    message: 'Product updated successfully',
                    name: PRODUCT_UPDATE,
                    duration: -1,
                    style: 'alert alert-success'
                });
                this.router.navigate(['/catalog/products']).then(r => undefined);
            },
            response => {
                const errors: object = response.error.error;
                const status = response.error.status;
                if (status === 422) {
                    parseErrors(errors, this.errors);
                }
            }
        );
    }

    public removeImage(){
        this.product.image = null;
        if (this.imageInput !== undefined) {
            this.imageInput.nativeElement.value = '';
        }
    }

    private retrieveProduct(){
        this.productService.retrieveProduct(this.product.id).subscribe((response: any) => {
            this.product = response.data;

            console.log(this.product)
        });
    }

}
