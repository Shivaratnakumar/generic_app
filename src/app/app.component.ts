import { Component, OnInit } from '@angular/core';
import { Post } from './Posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui-app';
  posts:Post[] = [];

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

  onPostSave(post:Post) {
    console.log("Post received",post);
    this.posts.push(post);
  }
}
