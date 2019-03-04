import { Component, OnInit } from '@angular/core';
import { Session } from '../core/session.model';
import { SessionService } from '../core/session.service';

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

  update(session: Session) {
    
  }

  delete(id: string) {
    this.sessionService.deleteSession(id);
  }
}
