import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from './session.model';
import { User } from './user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
    public sessionCollection: AngularFirestoreCollection<Session>;
    public session: Observable<Session[]>;
    public sessionDoc: AngularFirestoreDocument<Session>;

  constructor(private firestore: AngularFirestore, public authService: AuthService) {
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

    // Adds user to meetings roster and updates total enrollment.
    sessionEnroll(session: Session, user: User) {

      for (const meetingID of user.meetings) {
        if (meetingID === session.id) {
          console.log(`you are already signed up for this meeting!`);
          return;
        }
      }

      if (this.authService.isHelper(user)) {
      session.helpers.push(user.uid);
      this.firestore.doc('meetings/' + session.id).update({
        'helpers': session.helpers,
        'numberHelpers': (session.numberHelpers + 1)
      });
    } else if (this.authService.isLearner(user)) {
      session.students.push(user.uid);
      this.firestore.doc(`meetings/${session.id}`).update({
        'students': session.students,
        'numberStudents': (session.numberStudents++)
      });
    }
      // Adds meeting to user's enrolled meetings
      user.meetings.push(session.id);
      this.firestore.doc('users/' + user.uid).update({
        'meetings': user.meetings
      });
    }

// Admin functions only
    createSession(session: Session) {
      return this.firestore.collection('meetings').add(session);
    }

    updateSession(session: Session, id: string) {
      this.firestore.doc('meetings/' + id).update(session);
    }

    deleteSession(sessionId: string) {
      this.firestore.doc('meetings/' + sessionId).delete();
    }


}
