import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorEffect } from '../../stores/errors/error.effect';
import { ErrorFacade } from '../../stores/errors';

@Injectable({
  providedIn: 'root'
})
export class ErrorGuardService implements CanActivate {

    constructor(
        private errorEffect: ErrorEffect,
        private errorFacade: ErrorFacade
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):  Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {

        this.errorEffect.$showError.subscribe((response) => {
            console.log(response)
        });

        return true;
    }
}
