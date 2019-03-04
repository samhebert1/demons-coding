import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SessionViewComponent } from './session-view/session-view.component';
import { FormViewComponent } from './form-view/form-view.component';

const routes: Routes = [

  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sessions', component: SessionViewComponent},
  { path: 'form', component: FormViewComponent},
  { path: 'form/:id', component: FormViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
