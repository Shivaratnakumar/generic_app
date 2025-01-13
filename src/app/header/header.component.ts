import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  logout() {
    // Implement your logout logic here
    // For example, clear the user token and navigate to the login page
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
