import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointofsaleComponent } from './core/components/pages/components/pointofsale/pointofsale.component';

const routes: Routes = [
    {
        path: '',
        component: PointofsaleComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
