import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

// components
import { SidebarComponent } from './core/components/includes/sidebar/sidebar.component';
import { PointofsaleComponent } from './core/components/pages/components/pointofsale/pointofsale.component';
import { HeaderComponent } from './core/components/includes/header/header.component';
import { orderReducer } from './core/stores/orders';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './core/stores/orders/order.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PointofsaleComponent,
        SidebarComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        EffectsModule.forRoot([OrderEffect]),
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({
            orders: orderReducer
        }),
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
