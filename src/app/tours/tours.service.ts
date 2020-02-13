import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tour} from '../model/tour';
import {MyUser} from '../auth/user';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private tours: Tour[];

  constructor(public db: AngularFirestore) {
    this.tours = [];
  }

  getTours(): Observable<Tour[]> {
    return this.db.collection('tours').snapshotChanges().pipe(
      map(data => {
        // tslint:disable-next-line:no-shadowed-variable
        return data.map(data => {
          const tour = data.payload.doc.data() as Tour;
          tour.id = data.payload.doc.id;
          return tour;
        });
      })
    );
  }

  getTour(id: string): Observable<Tour> {
    return this.db.doc(`tours/${id}`).get().pipe(
      map(doc => {
        const tour = doc.data() as Tour;
        tour.id = id;
        return tour;
      })
    );
  }

  addTour(tour: any) {
    return this.db.collection('tours').add(tour);
  }

  updateTour(tour: any) {
    return this.db.doc(`tours/${tour.id}`).set(tour);
  }

  updateTourRate(tour: Tour, user: MyUser, rate: number) {
    tour.rates.push({userID: user.uid, rate});
    return this.db.doc(`tours/${tour.id}`).set(tour);
  }

  updateTermNumberOfPlaces(tour: Tour, termID: string, numberOfPlaces: number) {
    const termIndex = tour.terms.findIndex(term => term.id = termID);
    tour.terms[termIndex].numberOfLeftPlaces = tour.terms[termIndex].numberOfLeftPlaces - numberOfPlaces;
    return this.db.doc(`tours/${tour.id}`).set(tour);
  }
  updateTermNumberOfPlaces2(tour: Tour, termID: string) {
    const termIndex = tour.terms.findIndex(term => term.id = termID);
    tour.terms[termIndex].numberOfLeftPlaces = tour.terms[termIndex].numberOfLeftPlaces + 1;
    return this.db.doc(`tours/${tour.id}`).set(tour);
  }

  deleteTour(tour: Tour) {
    return this.db.doc(`tours/${tour.id}`).delete();
  }
}
