import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertModel } from './alert.model';
import { AlertState } from './alert.state';
import * as AlertAction from './alert.action';

@Injectable({
    providedIn: 'root'
})
export class AlertFacade {

    private readonly STORE_NAME = 'alerts';
    private readonly alert: Observable<AlertModel>;

    constructor(public store: Store<AlertState>) {
        this.alert = this.store.select(this.STORE_NAME);
    }

    public shareAlert({ message, style, name, duration }){
        const alert: AlertModel = {
            message, style, name, duration
        };

        this.store.dispatch(new AlertAction.ShowAlert(alert));
    }

    getAlert(){
        return this.alert;
    }
}
