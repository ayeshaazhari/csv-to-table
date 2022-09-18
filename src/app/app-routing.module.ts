import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';

const routes: Routes = [
 {
  path:"",
  component:AppComponent
 },
 {
  path:"dt",
  component:DatatableComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
