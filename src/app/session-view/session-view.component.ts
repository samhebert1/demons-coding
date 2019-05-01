import { Component, OnInit } from '@angular/core';

import { SessionService } from '../core/session.service';
import { AuthService } from '../core/auth.service';

import { User } from '../core/user';
import { Session } from '../core/session.model';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  public sessions: Session[];
  user: User;
  users: User[];
  id: string;
  MAX_HELPERS = 6;
  MAX_STUDENTS = 30;
  displayedColumns: string[] = ['Lesson', 'Meet Time', 'Students', 'Volunteers', 'Enroll'];

  constructor(private sessionService: SessionService, public auth: AuthService) {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);

    this.auth.user.subscribe(user => this.user = user);

   }

   ngOnInit () {

    console.log(this.user);
    console.log(this.sessions);

   }

  enrollUser(session: Session, user: User) {
    this.sessionService.sessionEnroll(session, user);
  }

  // Admin function only
  update(session: Session) {

  }

  // Admin function only
  delete(session: Session) {
    this.sessionService.deleteSession(session.id);
  }
}
