import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authListenerSubs: Subscription = new Subscription;
  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.isAuthenticated = isAuthenticated;
    });
  }


  onLogout() {
    // Implement your logout logic here
    // For example, clear the user token and navigate to the login page
    // localStorage.removeItem('userToken');
    // this.router.navigate(['/login']);

    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
