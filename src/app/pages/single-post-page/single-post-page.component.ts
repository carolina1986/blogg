import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Add Router import
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post-page', // The name of the HTML element
  standalone: true, // Makes the component a standalone component
  imports: [CommonModule, FormsModule, RouterModule], // List of modules to import
  templateUrl: './single-post-page.component.html', // The HTML file for the component
  styleUrls: ['./single-post-page.component.css'] // The CSS file for the component
})

// The class for the component
export class SinglePostPageComponent implements OnInit, OnDestroy { // Promises that a function called ngOnInit will be implemented
  post: any = null; // The post object, initially null
  newComment: any = { body: '' }; // The new comment object, initially empty
  private postSubscription?: Subscription;

  // The constructor is called when the component is created, works as a setup function and contains the component's dependencies
  constructor( 
    // Make it private so it can be accessed from the whole class
    private route: ActivatedRoute, // The route service, used to get the URL parameters
    private router: Router, // Add router service
    private postService: PostService // The post service, used to get the post data
  ) {}

  // Add the new comment to the post
  onSubmit() {
    // Check if the post has comments
    if (!this.post.comments) {
      this.post.comments = [];
    }
    // Add the comment to the post
    this.post.comments.push(this.newComment); 
    // Update the post in the service
    this.postService.addComment(this.post.id, this.newComment);   
    // Reset the new comment
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
            // Prenumerera på alla ändringar i posts
            this.postSubscription = this.postService.getPostsObservable().subscribe(posts => {
                // Hitta den specifika posten vi är intresserade av
                this.post = posts.find(p => p.id === id);
            });
        }
    });
  }

  //
  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  deletePost() {
    this.postService.deletePost(this.post.id);

  }

  increaseReactions() {
    this.postService.increaseReactions(this.post.id);
  } 

  decreaseReactions() {
    this.postService.decreaseReactions(this.post.id);
  }

}