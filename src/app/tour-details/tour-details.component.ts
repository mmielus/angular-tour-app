import {Component, OnInit} from '@angular/core';
import {ToursService} from '../tours/tours.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {Term, Tour} from '../model/tour';
import {MyUser} from '../auth/user';

import {BucketService} from '../bucket/bucket.service';


@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  tour: Tour;
  images: string[];
  selectedRate: number;
  rating = 2;
  user: MyUser;
  isUserAdmin: boolean;
  selectedTerm: Term;
  numberOfTakenPlaces: number;
  isRatingEnabled = false;
  showSpinner = true;

  private route: ActivatedRoute;
  private toursService: ToursService;
  private bucketService: BucketService;
  private authService: AuthService;
  private snackBar: MatSnackBar;
  private router: Router;

  constructor(authService: AuthService, route: ActivatedRoute, toursService: ToursService, bucketService: BucketService,
              snackBar: MatSnackBar, router: Router) {
    this.route = route;
    this.toursService = toursService;
    this.bucketService = bucketService;
    this.authService = authService;
    this.snackBar = snackBar;
    this.router = router;
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user as MyUser;
      this.isUserAdmin = this.authService.isAdmin(user);
      this.canRate();
    });
    this.getTour();
  }

  getTour() {
    const id: string = this.route.snapshot.paramMap.get('id').toString();
    this.toursService.getTour(id).subscribe(tour => {
      this.tour = tour;
      this.images = tour.images;
      const rateSum = tour.rates.map(rate => rate.rate).reduce((acc, a) => acc + a, 0);
      this.rating = rateSum / tour.rates.length;
      this.showSpinner = false;
      this.canRate();
    });
  }

  bookClicked() {
    if (this.selectedTerm == null) {
      this.openSnackBar('Wybierz termin wycieczki!');
      return;
    }

    if (this.numberOfTakenPlaces <= 0 || this.numberOfTakenPlaces == null) {
      this.openSnackBar('Wybierz poprawną ilość miejsc');
      return;
    }

    if (this.numberOfTakenPlaces > this.selectedTerm.numberOfLeftPlaces) {
      this.openSnackBar('Brak dostępnej ilości miejsc');
      return;
    }

    this.showSpinner = true;
    this.bucketService.reserveTour(this.user, this.tour, this.selectedTerm.id, this.numberOfTakenPlaces)
      .then(val => {
        this.showSpinner = false;
        this.openSnackBar('Wycieczka została dodana do koszyka!');
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

  deleteClicked() {
    this.showSpinner = true;
    this.toursService.deleteTour(this.tour)
      .then(val => {
        this.showSpinner = false;
        this.openSnackBar('Wycieczka pomyślnie usunięta');
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/tours'];
      })
      .catch(error => {
        this.showSpinner = false;
        this.openSnackBar('Błąd podczas usuwanai wycieczki. Spróbuj ponownie później');
      });
  }

  canRate() {
    const userRates = this.tour.rates
      .map(rate => rate.userID)
      .includes(this.user.uid);

    if (userRates) {
      this.isRatingEnabled = false;
      return;
    }

    const orderedUserTours = this.user.bookings
      .map(booking => booking.products.map(product => product.tourID))
      // tslint:disable-next-line:only-arrow-functions
      .reduce(function(a, b) {
        return a.concat(b);
      });

    this.isRatingEnabled = orderedUserTours.includes(this.tour.id);
  }

  ratingClicked(rate: number) {
    this.selectedRate = rate;
  }

  rateClicked() {
    this.showSpinner = true;
    this.toursService.updateTourRate(this.tour, this.user, this.selectedRate)
      .then(val => {
        this.showSpinner = false;
        this.openSnackBar('Ocena została pomyślnie dodana');
        const rateSum = this.tour.rates.map(rate => rate.rate).reduce((acc, a) => acc + a, 0);
        this.rating = rateSum / this.tour.rates.length;
        this.isRatingEnabled = false;
      })
      .catch(error => {
        this.showSpinner = false;
        this.openSnackBar('Błąd dodania oceny. Spróbuj ponownie później');
      });
  }

  isBookButtonHidden() {
    return this.tour.terms[0].numberOfLeftPlaces === 0;
  }

  isCancelButtonHidden() {
    return this.tour.terms[0].numberOfPlaces === this.tour.terms[0].numberOfLeftPlaces;
  }
}
