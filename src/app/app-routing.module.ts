import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InitialScreenComponent } from './initial-screen/initial-screen.component';
import { SignupComponent } from './signup/signup.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';


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
    path: 'create', component: PostCreateComponent
  },
  {
    path: 'edit/:postId', component: PostCreateComponent
  },
  {
    path: '', component: PostListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
