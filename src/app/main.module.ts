import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HelloRoutingModule} from './hello-routing.module';
import {HelloComponent} from './hello.component';
import {ToursComponent} from './tours/tours.component';
import {HeadingComponent} from './heading-component/heading.component';
import {TourComponent} from './tour/tour.component';
import {RateComponent} from './rate/rate.component';
import {RatesComponent} from './rates/rates.component';
import {NewTourComponent} from './new-tour/new-tour.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BucketComponent} from './bucket/bucket.component';
import {SearchComponentComponent} from './search-component/search-component.component';
import {ToursFilterPipe} from './tours/tours-filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSliderModule, MatSnackBarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ReservationComponent} from './reservation/reservation.component';
import {ToursService} from './tours/tours.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {EditTourComponent} from './edit-tour/edit-tour.component';
import {EditUserResolver} from './edit-tour/edit-tour.resolver';
import {TourDetailsResolver} from './tour-details/tour-details.resolver';
import {RatingModule} from 'ng-starrating';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    HelloComponent,
    ToursComponent,
    HeadingComponent,
    TourComponent,
    RateComponent,
    RatesComponent,
    NewTourComponent,
    BucketComponent,
    SearchComponentComponent,
    ToursFilterPipe,
    DashboardComponent,
    TourDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    ReservationComponent,
    EditTourComponent,
    HistoryComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HelloRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSliderModule,
    MatNativeDateModule,
    MatInputModule,
    AppRoutingModule,
    NgbCarouselModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatListModule,
    RatingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatCarouselModule,
    MatSidenavModule
  ],
  providers: [ToursService, EditUserResolver, TourDetailsResolver],
  bootstrap: [DashboardComponent]
})
export class MainModule {
}
