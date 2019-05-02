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


  myMeetings: Session[];

  meetings: string[];
  user;
  sessions: Session[];


  constructor(public auth: AuthService, public sessionService: SessionService) {
    this.myMeetings = [];
    this.user = this.auth.user.subscribe(user => {
                                          this.user = user;
                                          this.getInfo();
                                        }
                                      );

  }


    getInfo() {
      this.sessionService.getSessions().subscribe(sessions => {
                                                this.sessions = sessions;
                                                this.getMeetingData();
                                              }
                                            )

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

   unenroll(meeting: Session) {
     //Removes meeting from user object.
     for (let i = 0; i < this.user.meetings.length; i++) {
       if (this.user.meetings[i] === meeting.id) {
         this.user.meetings.splice(i, 1);
       }
     }
     //Updates users Meetings
     this.sessionService.updateUser(this.user, this.user.uid);
     //Checks if user is a helper or student
     if (this.user.role.helper == true){
       //Removes user from helper list of meeting
       for (let i = 0; i < meeting.helpers.length; i++) {
         if (meeting.helpers[i] === this.user.uid) {
           meeting.helpers.splice(i, 1);
           meeting.numberHelpers--;
         }
       }
     } else {
       //Removes user from students list of meeting
       for (let i = 0; i < meeting.students.length; i++) {
         if (meeting.students[i] === this.user.uid) {
           meeting.students.splice(i, 1);
           meeting.numberStudents--;
         }
       }
     }
     //Updates meeting in database
     this.sessionService.updateSession(meeting, meeting.id);

     //Reloads page
     window.location.reload();
   }


  ngOnInit() {

  }



}
