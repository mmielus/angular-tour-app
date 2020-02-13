import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {Tour} from '../model/tour';
import {ToursService} from '../tours/tours.service';
import {MyUser} from '../auth/user';
import {BucketReservation} from './bucketReservation';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private reservations: BucketReservation[];
  private firestore: AngularFirestore;
  private toursService: ToursService;

  constructor(firestore: AngularFirestore, toursService: ToursService) {
    this.firestore = firestore;
    this.toursService = toursService;
    this.reservations = [];
  }

  buyTours(user: MyUser) {
    const products = this.reservations.map(reservation => {
      return {
        tourID: reservation.tourID,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        numberOfPlaces: reservation.numberOfPlaces,
        totalPrice: reservation.numberOfPlaces * reservation.price,
        tourName: reservation.tourName
      };
    });
    const booking = {
      products: products,
      date: new Date()
    };
    user.bookings.push(booking);
    user.reservations = [];
    this.reservations = [];
    return this.firestore.collection('users').doc(user.uid).update(user);
  }

  getReservation(user: MyUser): BucketReservation[] {
    this.reservations = [];
    this.getReservedTour(user);
    return this.reservations;
  }

  reserveTour(user: MyUser, tour: Tour, termID: string, numberOfPlaces: number) {
    const reservation = {tourID: tour.id, termID: termID, numberOfPlaces: numberOfPlaces};
    user.reservations.push(reservation);

    const requests = Promise.all([this.firestore.collection('users').doc(user.uid).update(user),
      this.toursService.updateTermNumberOfPlaces(tour, termID, numberOfPlaces)]);
    return requests;
  }

  deleteReservation(user: MyUser, reservation: BucketReservation) {
    const index = user.reservations.findIndex(res => reservation.tourID === res.tourID);
    if (index > -1) {
      user.reservations.splice(index, 1);
    }
    this.toursService.getTour(reservation.tourID).subscribe(result => {
      this.toursService.updateTermNumberOfPlaces2(result, reservation.termID);
    });

    return this.firestore.collection('users').doc(user.uid).update(user);
  }

  private getReservedTour(user: MyUser) {
    user.reservations.forEach(reservation => {
      this.toursService.getTour(reservation.tourID).subscribe(tour => {
        const term = tour.terms.find(term => term.id === reservation.termID);
        const cartRes = {
          tourID: tour.id,
          termID: term.id,
          numberOfPlaces: reservation.numberOfPlaces,
          tourName: tour.name,
          startDate: term.startDate,
          endDate: term.endDate,
          price: term.price
        };
        this.reservations.push(cartRes);
      });
    });
  }
}
