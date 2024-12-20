import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-post-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="post">
      <h1>{{post.title}}</h1>
      <img *ngIf="post.thumbnailUrl" [src]="post.thumbnailUrl" alt="Post thumbnail">
      <p>{{post.body}}</p>
      <p>Published: {{post.creationDate | date}}</p>
    </div>
    <div *ngIf="!post">
      <p>Inlägget kunde inte hittas.</p>
    </div>
  `
})
export class SinglePostPageComponent implements OnInit {
  post: any = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    // Hämta ID från URL:en och ladda inlägget
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.getPost(id).subscribe(post => {
          this.post = post;
        });
      }
    });
  }
}