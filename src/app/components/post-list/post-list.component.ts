import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})

// Modify PostListComponent to add more logging
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {
    console.log('PostListComponent initialized');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.postService.getPostsObservable().subscribe({
      next: (posts) => {
        console.log('Received posts:', posts);
        this.posts = posts;
      },
      error: (error) => console.error('Error fetching posts:', error),
      complete: () => console.log('Posts subscription completed')
    });
  }
}