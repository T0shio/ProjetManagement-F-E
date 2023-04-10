import { FourofourComponent } from './core/components/fourofour/fourofour.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './pages/stock/stock.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {path : 'admin',  loadChildren : () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
  {path : 'client', loadChildren : () => import('./pages/client/client.module').then(m => m.ClientModule)},
  {path : 'login', component : LoginComponent},
  {path : '404', component : FourofourComponent},
  {path : '' , redirectTo : 'login', pathMatch: "full"},
  {path : '**', redirectTo : '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }