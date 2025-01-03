import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-new-post-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-new-post-page.component.html',
  styleUrls: ['./create-new-post-page.component.css'],
})


export class CreateNewPostPageComponent {
  // Template for a new post
  newPost = {
    title: '',
    thumbnailUrl: '',
    body: '',
    creationDate: new Date(),
    likes: 0,
    dislikes: 0,
    comments: [],
  };

  // Inject the post service
  constructor(private postService: PostService) {}

  // Functon for submitting the form (adding a new post)
  onSubmit() {
    this.postService.addPost(this.newPost); // Add the new post to the service
    alert('Blog post has been saved!');
    this.resetForm(); // Reset the form (function below)
  }

  // Reset form after submission
  resetForm() {
    this.newPost = {
      title: '',
      thumbnailUrl: '',
      body: '',
      creationDate: new Date(),
      likes: 0,
      dislikes: 0,
      comments: [],
    };
  }
}
