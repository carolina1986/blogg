import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-post-page',
  standalone: true,
  imports: [RouterOutlet, FormsModule], // Added FormsModule for ngModel
  templateUrl: './create-new-post-page.component.html',
  styleUrls: ['./create-new-post-page.component.css']
})
export class CreateNewPostPageComponent {
  newPost = {
    title: '',
    thumbnailUrl: '',
    body: '',
    creationDate: new Date(),
    likes: 0,
    dislikes: 0,
    comments: []
  };
  
  onSubmit() {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    posts.push(this.newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
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
      comments: []
    };
  }
}
