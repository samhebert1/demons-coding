import { Component, OnInit } from '@angular/core';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {

  sessions: Session[];
  constructor(private sessionService: SessionService) { }


  ngOnInit() {
    this.sessionService.getSessions().subscribe(sessions => this.sessions = sessions);
  }

  create(session: Session){
      this.sessionService.createSession(session);
  }

  update(session: Session) {
    this.sessionService.updateSession(session);
  }

  delete(id: string) {
    this.sessionService.deleteSession(id);
  }
}
