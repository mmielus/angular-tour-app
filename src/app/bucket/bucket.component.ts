import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BucketService} from './bucket.service';
import {AuthService} from '../auth/auth.service';
import {ToursService} from '../tours/tours.service';
import {Tour} from '../model/tour';
import {MatSnackBar} from '@angular/material';
import {BucketReservation} from './bucketReservation';
import {MyUser} from '../auth/user';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  reservations: BucketReservation[];
  showSpinner = true;
  user: MyUser;

  get empty(): boolean {
    return (this.reservations.length === 0);
  }

  private service: BucketService;
  private authService: AuthService;
  private snackBar: MatSnackBar;

  constructor(service: BucketService, authService: AuthService, snackBar: MatSnackBar) {
    this.reservations = [];
    this.service = service;
    this.authService = authService;
    this.snackBar = snackBar;
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.reservations = this.service.getReservation(user);
      this.user = user;
      this.showSpinner = false;
    });
  }

  getTotalPrice() {
    return this.reservations.length > 0 ?
      this.reservations
        .map(val => val.numberOfPlaces * val.price)
        // tslint:disable-next-line:only-arrow-functions
        .reduce(function(a, b) {
          return a + b;
        })
      : 0;
  }

  buyTours() {
    this.showSpinner = true;
    this.service.buyTours(this.user)
      .then(val => {
        this.reservations = [];
        this.showSpinner = false;
        this.openSnackBar('Przedmioty zostały pomyślnie zakupione');
      })
      .catch(error => {
        this.showSpinner = false;
        this.openSnackBar('Wystąpił błąd. Spróbuj ponownie później');
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }

  deleteReservation(reservation: BucketReservation) {
    this.service.deleteReservation(this.user, reservation)
      .then(val => {
        const index = this.reservations.indexOf(reservation, 0);
        if (index > -1) {
          this.reservations.splice(index, 1);
        }
        this.openSnackBar('Rezerwacja usunięta pomyślnie');
      })
      .catch(error => {
        this.openSnackBar('Błąd poczas usuwania rezerwacji');
      });
  }
}
