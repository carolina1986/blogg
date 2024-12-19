import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private localStorageKey = 'blogPosts';
  private postsSubject: BehaviorSubject<any[]>;

  constructor() {
    console.log('PostService constructor called');
    try {
      // Initialize BehaviorSubject after getting storage data
      const initialPosts = this.getPostsFromStorage();
      this.postsSubject = new BehaviorSubject<any[]>(initialPosts);
      
      if (initialPosts.length === 0) {
        console.log('No posts found, adding test post');
        const testPost = {
          title: 'Test Post',
          body: 'Test Content',
          creationDate: new Date()
        };
        this.addPost(testPost);
      }
      
      console.log('Initial posts loaded:', initialPosts);
    } catch (error) {
      console.error('Error initializing PostService:', error);
      this.postsSubject = new BehaviorSubject<any[]>([]);
    }
  }

  getPostsObservable(): Observable<any[]> {
    console.log('Getting posts observable');
    return this.postsSubject.asObservable();
  }

  private getPostsFromStorage(): any[] {
    try {
      console.log('Fetching posts from localStorage');
      const storedPosts = localStorage.getItem(this.localStorageKey);
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      console.log('Retrieved posts:', posts);
      return posts;
    } catch (error) {
      console.error('Error getting posts from storage:', error);
      return [];
    }
  }

  addPost(newPost: any): void {
    try {
      const posts = this.getPostsFromStorage();
      posts.push(newPost);
      localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
      this.postsSubject.next(posts);
      console.log('Post added successfully:', newPost);
      console.log('Updated posts:', posts);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
}