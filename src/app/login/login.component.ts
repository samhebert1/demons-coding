import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

//  this class controls the logic for for the login page. It utilizes functions from AuthService.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public auth: AuthService,
    private router: Router,
    public fb: FormBuilder,
    
  ) {}

  ngOnInit() {
    // Form logic for the login form.
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  //  functions for getting the form data.
  get email() { return this.loginForm.get('email');  }
  get password() { return this.loginForm.get('password'); }

  // Sign-in logic for login page.
  signInEmailPass(): void {
    this.auth.loginEmail(this.email.value, this.password.value)
    .then(_ => this.router.navigate(['/profile']));
  }

}
