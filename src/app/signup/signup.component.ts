import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: any) {

    console.log(form);
    if(form.invalid){
      return;
    }

    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
