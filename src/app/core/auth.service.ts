import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private fAuth: AngularFireAuth,
    private fStore: AngularFirestore,
    private router: Router
  ) {
    // check auth data
    this.user = this.fAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Email Auth
  emailSignup(email: string, password: string) {
    return this.fAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      return this.setUserDoc(user);
    })
    .catch(error => this.handleError(error) );
  }

  // Update properties of user doc
  updateUser(user: User, data: any) {
    return this.fStore.doc(`users/${user.uid}`).update(data);
  }

  // Error Handler
  private handleError(error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after auth
  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.fStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      name: user.name
    };

    return userRef.set(data);
  }

}
