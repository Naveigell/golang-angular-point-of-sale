import { Routes } from '@angular/router';
import { PointofsaleComponent } from '../components/pages/pointofsale/pointofsale.component';
import { ProductListComponent } from '../components/pages/catalog/products/product-list/product-list.component';
import { ProductAddComponent } from '../components/pages/catalog/products/product-add/product-add.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: PointofsaleComponent
    },
    {
        path: 'catalog/products',
        component: ProductListComponent
    },
    {
        path: 'catalog/products/add',
        component: ProductAddComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
