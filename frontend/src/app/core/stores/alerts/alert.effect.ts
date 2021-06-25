import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertFacade } from './alert.facade';
import { SHOW_ALERT } from './alert.action';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class AlertEffect {
    $shareAlert = createEffect(() => {
            return this.action.pipe(
                ofType(SHOW_ALERT),
                concatMap(() => {
                    return this.alertService.getAlert().pipe(
                        map((alert) => {
                            return alert;
                        })
                    );
                })
            );
        },
        { dispatch: false }
    )

    constructor(private action: Actions, private alertService: AlertFacade) {}
}
