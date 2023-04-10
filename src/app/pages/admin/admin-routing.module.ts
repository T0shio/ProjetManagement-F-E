import { AdminComponent } from './admin.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
import { RoleGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  {path : '', component : AdminComponent, canActivate: [RoleGuard], children : [
    {path : 'create', component : AddproductComponent},
    {path: 'list', component: ListComponent},
    {path : 'update/:id', component : UpdateComponent}

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
