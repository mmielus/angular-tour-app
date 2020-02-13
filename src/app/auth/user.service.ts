import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore) {
  }

  getUserByEmail(userEmail) {
    return this.db.collection('users', ref => ref.where('email', '==', userEmail))
      .snapshotChanges();
  }

  createUser(value) {
    return this.db.collection('users').add({
      email: value.email,
      isAdmin: value.isAdmin
    });
  }

}
