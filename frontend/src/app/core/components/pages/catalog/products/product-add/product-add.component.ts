import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { file } from '../../../../../../helpers/file';
import { FileModel } from '../../../../../models/file';
import { ProductsService } from '../../../../../services/http/products.service';
import { Router } from '@angular/router';
import { AlertFacade, PRODUCT_ADDED } from '../../../../../stores/alerts';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, AfterViewInit {

    @ViewChildren('imageInput')
    public imageInputs: QueryList<ElementRef>;

    public images: FileModel[] = [];
    readonly maxImageLength: number = 1;

    public categories = ['smartphone', 'pc', 'printer', 'food'];
    public categoryModal = {
        open: false
    }

    public errors = {
        name: null,
        sku: null,
        stock: null,
        category: null,
        minimum_stock: null,
        selling_price: null,
        purchase_price: null
    };

    public name: string;
    public sku: string;
    public stock: number;
    public category: string = this.categories[0];
    public minimumStock: number;
    public sellingPrice: number;
    public purchasePrice: number;

    constructor(
        private productService: ProductsService,
        private router: Router,
        private alertFacade: AlertFacade
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        console.log(this.imageInputs)
    }

    changeImage(target: any){
        file.toBase64(target.files[0]).then((response: string) => {
            const file: FileModel = {
                base64: response,
                blob: null,
                original: target.files[0]
            }

            this.images.push(file);
        }).catch((error) => {
            console.error(error)
        });
    }

    removeImage(index: number) {
        if (index < 0 || index >= this.images.length) {
            return;
        }

        this.images.splice(index, 1);
    }

    chooseImage(index: number){
        if (index < 0 || index >= this.imageInputs.length) {
            return;
        }

        const images = this.imageInputs.toArray();
        images[index].nativeElement.click();
    }

    save(){
        if (this.images.length <= 0) {
            return;
        }

        const append = (form: FormData, key: string, value: any) => {
            if (value !== undefined) {
                form.append(key, value.toString());
            }
        };

        const form = new FormData();
        form.append('image', this.images[0].original);
        append(form, 'name', this.name);
        append(form, 'sku', this.sku);
        append(form, 'category', this.category);
        append(form, 'stock', this.stock);
        append(form, 'minimum_stock', this.minimumStock);
        append(form, 'selling_price', this.sellingPrice);
        append(form, 'purchase_price', this.purchasePrice);

        this.productService.saveProduct(form).subscribe(
            (response) => {
                this.alertFacade.shareAlert({
                    message: 'Product added successfully',
                    name: PRODUCT_ADDED,
                    duration: -1,
                    style: 'alert alert-success'
                });
                this.router.navigate(['/catalog/products']).then(r => undefined);
            },
            (response) => {
                console.log(response.error.status)
                const errors: object = response.error.error;
                for (const error in errors) {
                    if (errors.hasOwnProperty(error)) {
                        if (this.errors.hasOwnProperty(error)) {
                            this.errors[error] = errors[error];
                        }
                    }
                }
            }
        );
    }
}
