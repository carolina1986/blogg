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
export class PostCarouselComponent implements OnInit {  // Promises that a function called ngOnInit will be implemented
  posts: any[] = []; // Array to store blog posts

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
}
