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

  constructor(public auth: AuthService, sessionService: SessionService) {
    this.sessCollection = sessionService.sessionCollection;
    console.log(`name: ${this.auth.user}`);

   }


  ngOnInit() {
    // this.samsUser2 = this.auth.getUser();
    // console.log(this.samsUser2);
  }


}
