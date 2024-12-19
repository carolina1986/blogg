// home-page.component.ts
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
  posts: any[] = [];

  constructor(private postService: PostService) {
    alert('HomePage Constructor');  // Detta ska visa en alert
  }

  ngOnInit() {
    alert('HomePage Init');  // Detta ska visa en alert
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPostsObservable().subscribe(posts => {
      alert(`Loaded ${posts.length} posts`);  // Detta ska visa antal posts
      this.posts = posts;
    });
  }
}