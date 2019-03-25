import { Component } from '@angular/core';

import { SessionService } from '../core/session.service';
import { AuthService } from '../core/auth.service';

import { User } from '../core/user';
import { Session } from '../core/session.model';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent {
  sessions: Session[];
  samsUser: User;
  users: User[];
  id: string;
  MAX_HELPERS = 6;
  MAX_STUDENTS = 30;

  constructor(private sessionService: SessionService, public auth: AuthService) {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);
    this.auth.user.subscribe(user => this.samsUser = user);
    
   }

  enrollUser(session: Session) {
    this.sessionService.sessionEnroll(session, this.samsUser);
  }

  // Admin function only
  update(session: Session) {

  }

  // Admin function only
  delete(session: Session) {
    this.sessionService.deleteSession(session.id);
  }
}
