import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

// components
import { SidebarComponent } from './core/components/includes/sidebar/sidebar.component';
import { PointofsaleComponent } from './core/components/pages/pointofsale/pointofsale.component';
import { ProductListComponent } from './core/components/pages/catalog/products/product-list/product-list.component';
import { HeaderComponent } from './core/components/includes/header/header.component';

// modules
import { orderReducer } from './core/stores/orders';
import { alertReducer } from './core/stores/alerts';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './core/stores/orders/order.effect';
import { AlertEffect } from './core/stores/alerts/alert.effect';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './core/routes/router';
import { ProductAddComponent } from './core/components/pages/catalog/products/product-add/product-add.component';
import { AddCategoryComponent } from './core/components/pages/catalog/products/product-add/modal/add-category/add-category.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PointofsaleComponent,
        SidebarComponent,
        ProductListComponent,
        ProductAddComponent,
        AddCategoryComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        EffectsModule.forRoot([OrderEffect, AlertEffect]),
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            orders: orderReducer,
            alerts: alertReducer
        }),
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
