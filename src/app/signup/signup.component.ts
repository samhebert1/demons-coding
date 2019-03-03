import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userState;
  signupForm: FormGroup;
  parentForm: FormGroup;
  roleForm: FormGroup;
  volunteerForm: FormGroup;
  isParent: boolean;
  isVolunteer: boolean;

  constructor(public fb: FormBuilder, public auth: AuthService) {}

  ngOnInit() {
    // This logic tracks user signup status that is used on HTML-side logic to determine view.
    this.userState = this.auth.user.pipe(
      map(user => {
        if (user) {
          return user ? 'complete' : 'incomplete';
        }
      })
    );

    // This is the form logic for taking the email and password for registration.
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.required
        ]
      ]
    });

    // Form logic for selecting a user type (Parent/learner or Volunteer/helper).
    this.roleForm = this.fb.group({
      role: ['', [Validators.required]]
    });

    // Volunteer-specific form logic
    this.volunteerForm = this.fb.group({
      name: ['', [Validators.required]],
      studentID: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    // Parent-specific form logic
    this.parentForm = this.fb.group({
      parentName: ['', [Validators.required]],
      childName: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  } // End ngOnInit

  // Functions (using getters)
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  get parentName() {
    return this.parentForm.get('parentName');
  }
  get childName() {
    return this.parentForm.get('childName');
  }
  get phone() {
    return this.parentForm.get('phone');
  }

  get name() {
    return this.volunteerForm.get('name');
  }
  get studentID() {
    return this.volunteerForm.get('studentID');
  }
  get studentPhone() {
    return this.volunteerForm.get('phone');
  }

  // Sets the role based on user selection.
  setRole(role: string) {
    if (role === 'learner') {
      this.isVolunteer = false;
      this.isParent = true;
      return console.log('role = parent');
    } else if (role === 'helper') {
      this.isParent = false;
      this.isVolunteer = true;
      return console.log('role = helper');
    }
  }

  // Step 1; register a new account.
  signup() {
    return this.auth.emailSignup(this.email.value, this.password.value);
  }

  // Step 2; update the database document with the user's details. Logic changes based on user role.
  updateUser(user) {
    if (this.isParent) {
      return this.auth.updateUser(user, {
        parent: this.parentName.value,
        child: this.childName.value,
        phone: this.phone.value,
        role: {
          learner: true
        }
      });
    } else if (this.isVolunteer) {
      return this.auth.updateUser(user, {
        name: this.name.value,
        phone: this.studentPhone.value,
        studentID: this.studentID.value,
        role: {
          helper: true
        }
      });
    }
  }
}
