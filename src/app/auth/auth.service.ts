
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Observable, of} from 'rxjs/index';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from './user.service';
import {MyUser} from './user';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user$: Observable<MyUser>;

  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc(`users/${user.uid}`).get().pipe(
            map(doc => {
              const user = doc.data() as MyUser;
              user.bookings = doc.data().bookings.map(booking => {
                booking.date = new Date(booking.date.seconds * 1000);
                booking.products = booking.products.map(product => {
                  product.startDate = new Date(product.startDate.seconds * 1000);
                  product.endDate = new Date(product.endDate.seconds * 1000);
                  return product;
                });
                return booking;
                ;
              });
              return user;
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  login({email, password}: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  updateUserData(user) {
    const userRef = this.firestore.doc(`users/${user.uid}`);
    const data: MyUser = {
      uid: user.uid,
      bookings: [],
      reservations: [],
      role: {
        client: true
      }
    };
    return userRef.set(data, {merge: true});
  }

  isClient(user: MyUser): boolean {
    const allowed = ['admin', 'client'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: MyUser): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  test(): boolean {
    const allowed = ['admin'];
    return true;
  }

  private checkAuthorization(user: MyUser, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.role[role]) {
        return true;
      }
    }
    return false;
  }
}
