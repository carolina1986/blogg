import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // Array to store blog posts
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    // Load posts when component initializes
    this.loadPosts();
  }

  // Fetch posts from the service
  loadPosts() {
    this.postService.getPostsObservable().subscribe(posts => {
      this.posts = posts;
    });
  }
}