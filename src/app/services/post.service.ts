import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private localStorageKey = 'blogPosts';
  private postsSubject: BehaviorSubject<any[]>;

  constructor() {
    const initialPosts = this.getPostsFromStorage();
    this.postsSubject = new BehaviorSubject<any[]>(initialPosts);
    
    if (initialPosts.length === 0) {
      const testPost = {
        id: this.generateId(), // Lägg till ID
        title: 'Test Post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec n unc.',
        thumbnailUrl: 'https://media.istockphoto.com/id/1084742460/photo/flat-earth.webp?a=1&b=1&s=612x612&w=0&k=20&c=TF7KgvPgBo1koKcC4pta8Zs5vynKt1gYzbJwH3ATuWk=',
        creationDate: new Date()
      };
      this.addPost(testPost);
    }
  }

  // Generera unikt ID för varje inlägg
  private generateId(): string {
    return Date.now().toString();
  }

  // Hämta ett specifikt inlägg baserat på ID
  getPost(id: string): Observable<any> {
    return new Observable(observer => {
      const posts = this.getPostsFromStorage();
      const post = posts.find(p => p.id === id);
      observer.next(post || null);
      observer.complete();
    });
  }

  getPostsObservable(): Observable<any[]> {
    return this.postsSubject.asObservable();
  }

  private getPostsFromStorage(): any[] {
    const storedPosts = localStorage.getItem(this.localStorageKey);
    return storedPosts ? JSON.parse(storedPosts) : [];
  }

  addPost(newPost: any): void {
    newPost.id = this.generateId(); // Lägg till ID för nya inlägg
    const posts = this.getPostsFromStorage();
    posts.push(newPost);
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
    this.postsSubject.next(posts);
  }
}