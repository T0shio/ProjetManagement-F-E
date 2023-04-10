import { DetailComponent } from './components/detail/detail.component';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FourofourComponent } from './components/fourofour/fourofour.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
       DetailComponent,
       FourofourComponent,
    ],
    imports: [
       CommonModule,
       ReactiveFormsModule,
    ],
    exports : [
       DetailComponent,
    ]
  })
  export class CoreModule { }
  