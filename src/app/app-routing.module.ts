import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaComponent } from './cinema/cinema.component';

const routes: Routes = [

  {
    path:"michel-bossoh",
    component: CinemaComponent
  },{
    path:"",
    redirectTo:"michel-bossoh",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
