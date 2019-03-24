import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userCollection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;
  public userDoc: AngularFirestoreDocument<User>;

constructor(private firestore: AngularFirestore) {
  this.userCollection = this.firestore.collection('users');
  this.users = this.userCollection.snapshotChanges().pipe(map(
    changes => {
      return changes.map(
        a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        });
    }));
 }

 getUsers(): Observable<User[]> {
 //  this.sessionCollection = this.firestore.collection<Session>('meetings');
 //  this.session = this.sessionCollection.valueChanges();
   return this.users;
 }
}
