import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private END_POINT = 'http://localhost:8080/api/v1/products';

    constructor(
        private http: HttpClient,
    ) { }

    public getProducts(){
        return this.http.get(this.END_POINT);
    }

    public saveProduct(form: FormData){
        return this.http.post(this.END_POINT, form);
    }

    public retrieveProduct(id: string){
        return this.http.get(this.END_POINT + `/${id}`);
    }

    public deleteProduct(id: string) {
        return this.http.delete(this.END_POINT + `/${id}`);
    }

    public updateProduct(id: string, product: ProductModel) {
        return this.http.put(this.END_POINT + `/${id}`, { ...product });
    }

    public updateProductImage(id: string, form: FormData){
        return this.http.patch(this.END_POINT + `/${id}/image`, form);
    }
}
