import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user';

// interface that defines user information types.
// @TODO: Change interface User to comply with types for data synchronization.
interface User {
  email: string;
  name: string;
}

// This is a service class that gives authentication logic for the app to communicate with Firebase backend.
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
  // Signup functionality via email; creates a new user using email/password provided with Firebase backend.
  emailSignup(email: string, password: string) {
    return this.fAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      return this.setUserDoc(res.user);
    });
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

  // Logout functionality
  logout() {
    this.fAuth.auth.signOut();
  }

  // Sets user data to firestore after auth
  private setUserDoc(nameData, emailData) {
    const userRef: AngularFirestoreDocument<User> = this.fStore.doc(`helpers/${emailData}`);

    const data: User = {
      email: emailData || null,
      name: nameData
  private setUserDoc(user) {
    console.log(user);

    const userRef: AngularFirestoreDocument<User> = this.fStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(data);
  }

  // Error Handler
  private handleError(error) {
    console.error(error);
  }

}
