import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SessionService } from '../core/session.service';
import { User } from '../core/user';
import { Session } from '../core/session.model';
import {authState} from 'rxfire/auth';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sessCollection;
  samsUser2: User;
  myMeetings: string[];
  meeting: string;
  profileUser: User;
  sessionList: string [];
  userSessions: Session [];

  constructor(public auth: AuthService, sessionService: SessionService) {
    this.sessCollection = sessionService.sessionCollection;
    this.auth.user.subscribe(user => this.profileUser = user);

   }


  ngOnInit() {
    // this.samsUser2 = this.auth.getUser();
    // console.log(this.samsUser2);
  }

  // getUserSessions() {
  //   this.profileUser.meetings.forEach(meetingID => {
  //     this.userSessions.push()
  //     this.sessCollection.

  //   });

}
