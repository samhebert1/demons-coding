import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { SessionService } from '../core/session.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  constructor(private sessionService: SessionService) { }


  sessionCollection = this.sessionService.getSessions();

  model = { lessonname: '', meettime: null };
  userSubmit() {
    this.addSession(this.model);
    this.model.lessonname = '';
    this.model.meettime = null;
  };

  addSession(session) {
    this.sessionService.createSession(session);
  };

  ngOnInit() {
  }

}
