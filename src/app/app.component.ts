import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demonscoding';

  constructor(private fAuth: AuthService) {}

  isLoggedIn() {
    return this.fAuth.user.pipe(first()).toPromise();
  }

  async doSomething() {
    const user = await this.isLoggedIn();
    if (user) {
      // do something
    } else {
      // do something else
    }
  }
}
