import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'region': ['', [
        ]
      ],
    });

       this.detailForm = this.fb.group({
        'catchPhrase': ['', [ Validators.required ] ]
      });
  }

    // Using getters will make your code look pretty
    get email() { return this.signupForm.get('email'); }
    get password() { return this.signupForm.get('password'); }

    get catchPhrase() { return this.detailForm.get('catchPhrase'); }


    // Step 1
    signup() {
      return this.auth.emailSignup(this.email.value, this.password.value, this.name.value);
    }

    // Step 2
    setCatchPhrase(user) {
      return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value });
    }

}
