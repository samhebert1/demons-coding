import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    public sessionCollection: AngularFirestoreCollection<Session>;
    public session: Observable<Session[]>;
    public sessionDoc: AngularFirestoreDocument<Session>;

  constructor(private firestore: AngularFirestore) {
    this.sessionCollection = this.firestore.collection('meetings');
    this.session = this.sessionCollection.snapshotChanges().pipe(map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Session;
            data.id = a.payload.doc.id;
            return data;
          });
      }));
   }


    getSessions(): Observable<Session[]> {
    //  this.sessionCollection = this.firestore.collection<Session>('meetings');
    //  this.session = this.sessionCollection.valueChanges();
      return this.session;
    }


    createSession(session: Session) {
      return this.firestore.collection('meetings').add(session);
    }

    updateSession(session: Session) {
      delete session.id;
      this.firestore.doc('meetings/' + session.id).update(session);
    }

    deleteSession(sessionId: string) {
      this.firestore.doc('meetings/' + sessionId).delete();
    }


}
