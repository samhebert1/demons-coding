import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { SessionService } from '../core/session.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  constructor(public sessionService: SessionService, private route: ActivatedRoute) { }
  sessions: Observable<Session[]>;
  id: string;
  session: Session;

  model = { lessonname: '', meettime: null, helpers: [], students: [], numberHelpers: 0, numberStudents: 0 };
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

  addSession(session) {
    this.sessionService.createSession(session);
  };

  updateSession(session){
    this.sessionService.updateSession(session, this.id);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id = params['id'];
    });


    }
  }
