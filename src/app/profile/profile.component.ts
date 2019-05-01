import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionService } from '../core/session.service';
import { User } from '../core/user';
import { Session } from '../core/session.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authState } from 'rxfire/auth';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sessCollection;
  samsUser2: User;
  myMeetings: Session[];
  meeting: string;
  profileUser: User;
  sessionList: string [];
  userSessions: Session [];
  meetings: string[];
  user;
  sessions: Session[];


  constructor(public auth: AuthService, sessionService: SessionService) {
    this.myMeetings = [];
    this.user = this.auth.user.subscribe(user => {
      this.user = user;
      this.getInfo(sessionService);
    }
    );
  }

  getInfo(sessionService: SessionService) {
    sessionService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.getMeetingData();
    }
    );
  }

  getMeetingData() {
    this.meetings = this.user.meetings;
    this.queryDBMeetingData();
  }

  queryDBMeetingData() {
    for (let meeting of this.meetings) {
      for (let session of this.sessions) {
        if (session.id === meeting) {
          this.myMeetings.push(session);
        }
      }
    }
  }


  ngOnInit() {

  }



}
