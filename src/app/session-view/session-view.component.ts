import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { SessionService } from '../core/session.service';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user';
import {  authState } from 'rxfire/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  authie = firebase.auth();
  sessions: Session[];
  u: User;


  constructor(
    private sessionService: SessionService,
    public auth: AuthService
    ) {
      authState(this.authie).subscribe(user => console.log(`hi ${user.uid}`));
       }

  ngOnInit() {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);

    console.log(`${this.u}`);
  }

  enrollUser(sessionID: string) {

    let userRole: string;

    if (this.u.roles['learner'] ) {
      userRole = 'learner';
    } else if (this.u.roles['helper']) {
      userRole = 'helper';
    }

      this.sessionService.sessionEnroll(this.u.uid, sessionID, userRole);

  }

  // Admin function only
  update(session: Session) {

  }

  // Admin function only
  delete(id: string) {
    this.sessionService.deleteSession(id);
  }
}
