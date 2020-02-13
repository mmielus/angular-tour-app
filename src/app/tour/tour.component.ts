import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {BucketService} from '../bucket/bucket.service';
import {Router} from '@angular/router';
import {UserService} from '../auth/user.service';
import {AuthService} from '../auth/auth.service';
import {RatesService} from '../rates/rates.service';
import {StarRatingComponent} from 'ng-starrating';
import {Tour} from '../model/tour';
import {MyUser} from '../auth/user';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  currentUser: any;
  test: any;
  rate: any;
  user: MyUser;
  @Input() tour: Tour;
  @Output() editTourEmitter = new EventEmitter<Tour>();
  isUserAdmin: boolean;


  constructor(private bucketService: BucketService, private router: Router, private userService: UserService,
              private authService: AuthService, private ratesService: RatesService) {
  }

  ngOnInit() {
    this.isCurrentUserIsAdmin();
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isUserAdmin = this.authService.isAdmin(this.user);
      //   this.canRate();
    });
  }

  makeReservation(valve) {
    // this.bucketService.addTour(valve);
  }

  // returnReservation() {
  //   if (this.tour.availableAmount < this.tour.maxAmount) {
  //     this.tour.availableAmount += 1;
  //   }
  // }

  editTour(tourId) {
    this.router.navigate(['/editTour/' + tourId]);
  }

  isCurrentUserIsAdmin() {
    if (!this.isLogged()) {
      return false;
    }
    return this.isUserAdmin;
  }

  // isAvailable() {
  //   return this.tour.availableAmount === 0;
  // }
  //
  // isAnyReserved() {
  //   return this.tour.availableAmount === this.tour.maxAmount;
  // }

  // getPlusButtonStyle(): string {
  //   return this.isAvailable() ? 'hidden' : 'visible';
  // }
  //
  // getMinusButtonStyle(): string {
  //   return this.isAnyReserved() ? 'hidden' : 'visible';
  // }

  navigateTo(s: string) {
    this.router.navigateByUrl(s);
  }

  isLogged() {

    return this.user === null ? false : true;
  }

  // onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }, tourId) {
  //   const currentUser = this.authService.getCurrentUser();
  //
  //   this.ratesService.getRate(tourId, currentUser.email).subscribe(result => {
  //     this.rate = result;
  //     if (result.length > 0) {
  //       this.ratesService.updateRate(this.rate[0].payload.doc.id, $event.newValue, tourId, currentUser.email);
  //     } else {
  //       this.ratesService.createRate($event.newValue, tourId, currentUser.email);
  //     }
  //   });
  // }

  getLowestPrice() {
    return Math.min(...this.tour.terms.map(term => term.price));
  }


}
