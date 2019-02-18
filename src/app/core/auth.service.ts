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

// interface that defines user information types.
// @TODO: Change interface User to comply with types for data synchronization.
interface User {
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
          return this.fStore.doc<User>(`helpers/${user.email}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Email signup
  async emailSignup(email: string, password: string, name: string ) {
    try {
      const user = await this.fAuth.auth.createUserWithEmailAndPassword(email, password);
      return this.setUserDoc(name, email);
    } catch (error) {
      return this.handleError(error);
    }
  }

// Login function for email users
  async loginEmail(email: string, password: string) {
    try {
    const result = await this.fAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['home']);
  } catch (error) {
    return this.handleError(error);
  }
}

  // Update properties of user doc
  updateUser(user: User, data: any) {
    return this.fStore.doc(`helpers/${user.email}`).update(data);
  }

  // Error Handler
  private handleError(error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after auth
  private setUserDoc(nameData, emailData) {
    const userRef: AngularFirestoreDocument<User> = this.fStore.doc(`helpers/${emailData}`);

    const data: User = {
      email: emailData || null,
      name: nameData
    };

    return userRef.set(data);
  }

}
