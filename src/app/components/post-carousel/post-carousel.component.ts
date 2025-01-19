import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-carousel.component.html',
  styleUrl: './post-carousel.component.css'
})
export class PostCarouselComponent implements OnInit { 
  posts: any[] = []; // An array to store the posts fetched from the service
  currentIndex: number = 0; // The index of the current post being viewed
  postsPerView: number = 1; // The number of posts to display at a time

  // The constructor is used, in this case, to inject the post service
  constructor(private postService: PostService) {}

  // The ngOnInit function that was promised in the class declaration
  ngOnInit() {
    this.loadPosts(); // Calls the loadPosts function to fetch posts from the service
  }

  // Function to fetch posts from the service by: 
  // -referencing the post service
  // -using the getPostsObservable function from the post service
  // -using the subscribe function to listen for changes in the data
  // -updating the posts array with the new data
  loadPosts() {
    this.postService.getPostsObservable().subscribe(posts => {
      this.posts = posts;
    });
  }

  // Using getter to return the current posts to display
  get currentPosts(): any[] {
    return this.posts.slice(this.currentIndex, this.currentIndex + this.postsPerView);
  }


  previousPosts() {
    if (this.currentIndex > 0) { // If the current index is greater than 0
      this.currentIndex -= this.postsPerView; // Decrease the index by the number of posts per view
      if (this.currentIndex < 0) { // If the current index is less than 0
        this.currentIndex = 0; // Set the current index to 0
      }
    }
  }

  nextPosts() {
    if (this.currentIndex + this.postsPerView < this.posts.length) { // If the current index plus the number of posts per view is less than the length of the posts array
      this.currentIndex += this.postsPerView; // Increase the index by the number of posts per view
    }
  }

  canGoPrevious(): boolean { 
    return this.currentIndex > 0; 
  }

  canGoNext(): boolean {
    return this.currentIndex + this.postsPerView < this.posts.length; 
  }
    
}
