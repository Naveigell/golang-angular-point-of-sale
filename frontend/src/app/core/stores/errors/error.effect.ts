import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ErrorFacade } from './error.facade';
import { SHOW_ERROR } from './error.action';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorEffect {
    $showError = createEffect(() => {
            return this.action.pipe(
                ofType(SHOW_ERROR),
                concatMap(() => {
                    return this.errorFacade.getError().pipe(
                        map((error) => {
                            return error;
                        })
                    );
                })
            );
        },
    { dispatch: false }
    );

    constructor(private action: Actions, private errorFacade: ErrorFacade) {}
}
