import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Roles } from './user';


// This is a service class that gives authentication logic for the app to communicate with Firebase backend.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;


  constructor(
    public fAuth: AngularFireAuth,
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
    return this.fStore.doc(`users/${user.uid}`).update(data);
  }

  // Logout functionality
  async logout() {
    await this.fAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  // Sets user data to firestore after auth
  private setUserDoc(user) {
    console.log(user);

    const userRef: AngularFirestoreDocument<User> = this.fStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(data);
  }

  getUserDoc(): Observable<User> {
    return this.user;
  }

  // Error Handler
  private handleError(error) {
    console.error(error);
  }

  // Role-based auth ////

  isLearner(user: User): boolean {
    const checkedRoles = ['learner'];
    return this.CheckRole(user, checkedRoles);
  }

  isHelper(user: User): boolean {
    const checkedRoles = ['helper'];
    return this.CheckRole(user, checkedRoles);
  }

  isAdmin(user: User): boolean {
    const checkedRoles = ['admin'];
    return this.CheckRole(user, checkedRoles);
  }

  private CheckRole (user: User, roleCheck: string[]): boolean {
    if (!user) { return false; }
    for (const role of roleCheck) {
      if (user.role[role]) {
        return true;
      }
    }
    return false;
  }

}
