import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ParkinglotComponent } from './parkinglot/parkinglot.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path:'parking-lot',component:ParkinglotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
