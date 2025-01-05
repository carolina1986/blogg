import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Add Router import
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-post-page', // The name of the HTML element
  standalone: true, // Makes the component a standalone component
  imports: [CommonModule, FormsModule, RouterModule], // List of modules to import
  template: 
  `<div *ngIf="post">
    <div>
      <h1>{{post.title}}</h1>
       <p>Published: {{post.creationDate | date}}</p>
      <img *ngIf="post.thumbnailUrl" [src]="post.thumbnailUrl" alt="Post thumbnail">
      <p>{{post.body}}</p>
    </div>

    <div>
      <button (click)="increaseReactions()">Like</button>
      <p>Reactions: {{post.reactions}}</p>
      <button (click)="decreaseReactions()">Dislike</button>
    </div>

    <div *ngIf="post?.comments?.length > 0">
      <h2>Comments</h2>
      <div *ngFor="let comment of post.comments">
        <p>{{comment.body}}</p>
      </div> 
    </div>

    <h3>Add a comment</h3>
    <form (ngSubmit)="onSubmit()" #commentForm="ngForm"> 
      <label for="comment">Write your comment below:</label>
      <textarea id="comment" name="comment" [(ngModel)]="newComment.body" required></textarea>
      <button type="submit" [disabled]="!commentForm.valid">Publish</button>
    </form>

      <button (click)="deletePost()">Delete post</button>
      <button routerLink="/">Back</button>
  </div>
      
  <div *ngIf="!post">
    <p>Post could not be found.</p>
  </div>`
    })

// The class for the component
export class SinglePostPageComponent implements OnInit { // Promises that a function called ngOnInit will be implemented
  post: any = null; // The post object, initially null
  newComment: any = { body: '' }; // The new comment object, initially empty
  // The constructor is called when the component is created, works as a setup function and contains the component's dependencies
  constructor( 
    // Make it private so it can be accessed from the whole class
    private route: ActivatedRoute, // The route service, used to get the URL parameters
    private router: Router, // Add router service
    private postService: PostService // The post service, used to get the post data
  ) {}

  // Add the new comment to the post
  onSubmit() {
    // Lägg till kommentaren i vår lokala post först
    if (!this.post.comments) {
      this.post.comments = [];
    }
    this.post.comments.push(this.newComment);
    
    // Uppdatera i service
    this.postService.addComment(this.post.id, this.newComment);
    
    // Återställ kommentarsfältet
    this.newComment = { body: '' };
  }



  updatePost() { 
    this.postService.updatePost(this.post); 
  }


  // The ngOnInit that was promised in the class declaration
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.getPost(id).subscribe(post => {
          this.post = post;
        });
      }
    });
  }

  deletePost() {
    if (this.post && confirm('Are you sure you want to delete this post?')) {
      try {
        this.postService.deletePost(this.post.id);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Something went wrong when deleting the post.');
      }
    }
  }

  increaseReactions() {
    this.post.reactions++;
    this.postService.updatePost(this.post);
  } 

  decreaseReactions() {
    if (this.post.reactions > 0) {
      this.post.reactions--;
      this.postService.updatePost(this.post);
    }
  }


}