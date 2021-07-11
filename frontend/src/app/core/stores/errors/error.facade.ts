import { Observable } from 'rxjs';
import { ErrorModel } from './error.model';
import { Store } from '@ngrx/store';
import { ErrorState } from './error.state';
import { Injectable } from '@angular/core';
import * as ErrorAction from './error.action';

@Injectable({
    providedIn: 'root'
})
export class ErrorFacade {
    private readonly STORE_NAME = 'errors';
    private readonly error: Observable<ErrorModel>;

    constructor(public store: Store<ErrorState>) {
        this.error = this.store.select(this.STORE_NAME);
    }

    public showError({ message, code }) {
        const error: ErrorModel = {
            message, code
        }

        this.store.dispatch(new ErrorAction.ShowError(error));
    }

    public clearError(){
        this.store.dispatch(new ErrorAction.ClearError());
    }

    public getError(){
        return this.error;
    }
}
