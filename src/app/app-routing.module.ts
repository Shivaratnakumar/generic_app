import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
// import { LoginComponent } from './login/login.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
// import { SignupComponent } from './signup/signup.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { AuthGaurd } from './auth/auth.guard';


const routes: Routes =[
  {
    path: 'initScreen', component: InitialScreenComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'create', component: PostCreateComponent, canActivate:[AuthGaurd]
  },
  {
    path: 'edit/:postId', component: PostCreateComponent, canActivate:[AuthGaurd]
  },
  {
    path: '', component: PostListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
