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

  onSubmit() {
    this.postService.addPost(this.newPost); // Använd servicen för att lägga till inlägget
    alert('Blog post has been saved!');
    this.resetForm();
  }

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
