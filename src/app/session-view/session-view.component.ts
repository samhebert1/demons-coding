import { Component, OnInit } from '@angular/core';

import { SessionService } from '../core/session.service';
import { AuthService } from '../core/auth.service';

import { User } from '../core/user';
import { Session } from '../core/session.model';
import { MatSnackBar } from '@angular/material';

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


  constructor(private sessionService: SessionService, public auth: AuthService, private snackBar: MatSnackBar) {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);

    this.auth.user.subscribe(user => this.user = user);

   }


   ngOnInit () {

   }

  enrollUser(session: Session, user: User) {
    this.sessionService.sessionEnroll(session, user);
    this.snackBar.open("You signed up for the meeting!", "OK", { duration: 2000});
  }


  // Admin function only
  delete(session: Session) {
    this.sessionService.deleteSession(session.id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }










}
