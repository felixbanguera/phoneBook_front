import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const ROUTES: Routes = [
    //{ path: 'verify', component: VerifyComponent},
    { path: '', pathMatch: 'full', component: HomeComponent},
    //{ path: '**', pathMatch: 'full', redirectTo: 'load'},

]