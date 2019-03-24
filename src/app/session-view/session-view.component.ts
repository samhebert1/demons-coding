import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { SessionService } from '../core/session.service';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
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
  users: User[];
  id: string;
  MAX_HELPERS = 6;
  MAX_STUDENTS = 30;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    public auth: AuthService
    ) {
      authState(this.authie).subscribe(user => {
        this.id = user.uid;
      });
      }
  ngOnInit() {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.getUser();
    });
  }


  getUser() {
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].uid == this.id){
        this.u = this.users[i];
      }
    }
  }

  enrollUser(session: Session) {

    this.sessionService.sessionEnroll(session, this.u);

  }

  // Admin function only
  update(session: Session) {

  }

  // Admin function only
  delete(id: string) {
    this.sessionService.deleteSession(id);
  }
}
