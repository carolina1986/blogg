import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Add Router import
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-post-page', // The name of the HTML element
  standalone: true, // Makes the component a standalone component
  imports: [CommonModule], // List of modules to import
  // The component's html template (how it looks)
  template: ` 
    <div *ngIf="post">
      <h1>{{post.title}}</h1>
      <img *ngIf="post.thumbnailUrl" [src]="post.thumbnailUrl" alt="Post thumbnail">
      <p>{{post.body}}</p>
      <p>Published: {{post.creationDate | date}}</p>
      <button (click)="deletePost()">Radera inlägg</button>
    </div>
    <div *ngIf="!post">
      <p>Post could not be found.</p>
    </div>
  `
  /*    
    <div *ngIf="post"> // Show the post if it exists
      <h1>{{post.title}}</h1> // Show the post title, called interpolation
      <img *ngIf="post.thumbnailUrl" [src]="post.thumbnailUrl" alt="Post thumbnail"> // Show the post thumbnail if it exists
      <p>{{post.body}}</p> // Show the post body
      <p>Published: {{post.creationDate | date}}</p> // Show the post creation date
    </div>
    <div *ngIf="!post"> // Show this if the post doesn't exist
      <p>Post could not be found.</p>
    </div>
    */ 
})

// The class for the component
export class SinglePostPageComponent implements OnInit { // Promises that a function called ngOnInit will be implemented
  post: any = null; // The post object, initially null

  // The constructor is called when the component is created, works as a setup function and contains the component's dependencies
  constructor( 
    // Make it private so it can be accessed from the whole class
    private route: ActivatedRoute, // The route service, used to get the URL parameters
    private router: Router, // Add router service

    private postService: PostService // The post service, used to get the post data
  ) {}

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
}