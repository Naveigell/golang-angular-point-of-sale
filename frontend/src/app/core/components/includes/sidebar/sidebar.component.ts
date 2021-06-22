import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OrderFacade, OrdersModel } from '../../../stores/orders';
import { Observable } from 'rxjs';

@Component({
    selector: '[app-sidebar]',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

    public open: boolean;

    constructor(private orderService: OrderFacade) {
        this.open = true;
    }

    ngOnInit() {}
}
