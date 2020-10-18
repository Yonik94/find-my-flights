import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './pages/flight/flight.component';
import { SingleFlightComponent } from './pages/single-flight/single-flight.component';
const routes: Routes = [
  {path: '', component: FlightComponent},
  {path: ':id', component: SingleFlightComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
