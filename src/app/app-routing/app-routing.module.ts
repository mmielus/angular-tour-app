import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewTourComponent} from '../new-tour/new-tour.component';
import {ToursComponent} from '../tours/tours.component';
import {TourDetailsComponent} from '../tour-details/tour-details.component';
import {ReservationComponent} from '../reservation/reservation.component';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {BucketComponent} from '../bucket/bucket.component';
import {EditTourComponent} from '../edit-tour/edit-tour.component';
import {EditUserResolver} from '../edit-tour/edit-tour.resolver';
import {TourDetailsResolver} from '../tour-details/tour-details.resolver';
import {AuthGuard} from '../auth/auth-guard.service';
import {ClientGuard} from '../auth/client-guard.service';
import {HistoryComponent} from '../history/history.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},
  {path: 'newTour', component: NewTourComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ToursComponent},
  {path: 'tourDetails/:id', component: TourDetailsComponent, resolve: {data: TourDetailsResolver}, canActivate: [ClientGuard]},
  {path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'bucket', component: BucketComponent, canActivate: [ClientGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [ClientGuard]},
  {path: 'editTour/:id', component: EditTourComponent, canActivate: [AuthGuard], resolve: {data: EditUserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
