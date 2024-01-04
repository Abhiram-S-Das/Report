import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path:'first',component:GridComponent},
  {path:'second',component:TableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
