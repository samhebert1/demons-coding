import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    public sessionCollection: AngularFirestoreCollection<Session>;
    public session: Observable<Session[]>;

  constructor(private firestore: AngularFirestore) { }

    getSessions(): Observable<Session[]> {
      this.sessionCollection = this.firestore.collection<Session>('meetings');
      this.session = this.sessionCollection.valueChanges();
      return this.session;
    }


    createSession(session: Session) {
      return this.firestore.collection('session').add(session);
    }

    updateSession(session: Session) {
      delete session.id;
      this.firestore.doc('sessions/' + session.id).update(session);
    }

    deleteSession(sessionId: string) {
      this.firestore.doc('policies/' + sessionId).delete();
    }
}
