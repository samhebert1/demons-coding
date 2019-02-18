import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  userState;

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {

    this.userState = this.auth.user.pipe(
      map(user => {
        if (user) {
          return user.email ? 'complete' : 'incomplete';
        }
      }));

      this.signupForm = this.fb.group({
        'name': ['', [
          ]
        ],
      'email': ['', [
        Validators.required,
        Validators.email
        ],
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
  } // End ngOnInit

  // Functions (using getters)
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get name() { return this.signupForm.get('name'); }

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

