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

  constructor(private postService: PostService) {}

  // Handle form submission
  onSubmit() {
    this.postService.addPost(this.newPost);
    alert('Blog post has been saved!');
    this.resetForm();
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
