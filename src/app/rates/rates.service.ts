import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  rates: Array<any>;

  constructor(public db: AngularFirestore) {
  }

  createRate(newValue, newTourId, currentUser) {
    return this.db.collection('rates').add({
      tourId: newTourId,
      value: newValue,
      rateBy: currentUser
    });
  }

  updateRate(rateKey, newValue, newTourId, currentUser) {
    this.db.collection('rates').doc(rateKey).set({
      tourId: newTourId,
      value: newValue,
      rateBy: currentUser
    });
  }

  getRate(tourId, rateBy) {
    return this.db.collection('rates', ref => ref.where('tourId', '==', tourId)
      .where('rateBy', '==', rateBy)).snapshotChanges();
  }

  getRates() {
    return this.db.collection('rates').snapshotChanges();
  }
}
