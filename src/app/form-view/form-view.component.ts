import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { User } from '../core/user';
import { SessionService } from '../core/session.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  sessions: Session[];
  id: string;
  session: Observable<Session>;
  meeting: Session;
  allUsers: User[];
  enrolledHelpers: User[];
  enrolledStudents: User[];
  model = { lessonname: '', meettime: null, helpers: [], students: [], numberHelpers: 0, numberStudents: 0 };

  constructor(public sessionService: SessionService, private route: ActivatedRoute) {
    this.enrolledHelpers = [];
    this.enrolledStudents = [];
  }



  userSubmit() {
    if (this.id === undefined){
      this.addSession(this.model);
      this.model.lessonname = '';
      this.model.meettime = null;
    } else {
      this.updateSession(this.model);
      this.model.lessonname = '';
      this.model.meettime = null;
    }
  };

//Admin functionality
  addSession(session) {
    this.sessionService.createSession(session);
  };

//Admin functionality
  updateSession(session){
    this.sessionService.updateSession(session, this.id);
  }

  getSession() {
    for (let session of this.sessions) {
      if (session.id === this.id) {
        return session;
      }
    }
  }

  filterUsers() {
    //Loops through all users
    for (let user of this.allUsers) {
      //Loops through helpers in meeting.
      for (let helper of this.meeting.helpers) {
        if (user.uid === helper) {
          this.enrolledHelpers.push(user);
        } //end if
      } //end inner for
      //Loops through students in meeting.
      for (let student of this.meeting.students) {
        if (user.uid === student) {
          this.enrolledStudents.push(user);
        } //end if
      } //end inner for
    } //end outer for
  }

  getEnrolledUsers() {
    this.sessionService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.filterUsers();
    })
  }

  ngOnInit() {
    //Gets meeting id from url
    this.route.params.subscribe(params => {
    this.id = params['id'];
    });

    this.sessionService.getSessions().subscribe(sessions => {
                                                this.sessions = sessions;
                                                this.meeting = this.getSession();
                                                this.getEnrolledUsers();
                                              });

    this.model = { lessonname: this.meeting.lessonname, meettime: this.meeting.meettime,
                  helpers: this.meeting.helpers, students: this.meeting.students,
                  numberHelpers: this.meeting.numberHelpers, numberStudents: this.meeting.numberStudents };
    }


  }
