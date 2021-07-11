import { Routes } from '@angular/router';
import { PointofsaleComponent } from '../components/pages/pointofsale/pointofsale.component';
import { ProductListComponent } from '../components/pages/catalog/products/product-list/product-list.component';
import { ProductAddComponent } from '../components/pages/catalog/products/product-add/product-add.component';
import { ProductEditComponent } from '../components/pages/catalog/products/product-edit/product-edit.component';
import { NotFoundComponent } from '../components/errors/not-found/not-found.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: PointofsaleComponent,
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
        path: 'catalog/products/:id',
        component: ProductEditComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
