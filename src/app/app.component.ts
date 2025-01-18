import { Component } from '@angular/core';
import { Post } from './Posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui-app';
  posts:Post[] = [];

  onPostSave(post:Post) {
    console.log("Post received",post);
    this.posts.push(post);
  }
}
