import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes =[
  {
    path: '', component: InitialScreenComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
