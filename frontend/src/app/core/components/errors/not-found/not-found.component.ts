import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorFacade } from '../../../stores/errors';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

    constructor(
        private errorFacade: ErrorFacade,
        private detector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.errorFacade.showError({
            message: 'Error',
            code: 500
        });
    }

    ngOnDestroy() {
        this.errorFacade.clearError();
    }
}
