import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PointofsaleService {

    private END_POINT = 'https://fakestoreapi.com/products/';

    constructor(private http: HttpClient) { }

    public getProducts(){
        return this.http.get(this.END_POINT);
    }
}
