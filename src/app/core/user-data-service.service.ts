import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  userDocument: AngularFirestoreDocument<User>;
  user: Observable<User>;

//   constructor(fstore: AngularFirestore, fireAuth: AngularFireAuth) {
//     this.user = fireAuth.authState.pipe(
//       switchMap(user => {
//         if (user) {
//           return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
//         } else {
//           return of(null)
//         }
//       })
//     )
//    }
}
