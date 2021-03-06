import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PointofsaleService {

    private END_POINT = 'http://localhost:8080/api/v1/products';

    constructor(private http: HttpClient) { }

    public getProducts(){
        return this.http.get(this.END_POINT);
    }
}
