import { Injectable } from '@angular/core'; // Allowing the service to be injected into other components
import { BehaviorSubject, Observable } from 'rxjs'; // Allows subscribers to listen for changes in the data

@Injectable({
  providedIn: 'root', // Makes the service available to the entire application
})
export class PostService { // Creating a service to manage blog posts
  private localStorageKey = 'blogPosts'; // Private key for storing posts in local storage
  private postsSubject: BehaviorSubject<any[]>; // Private subject to store the list of posts

  constructor() { 
    const initialPosts = this.getPostsFromStorage(); // Initializes the service by fetching posts from local storage and setting up a reactive state
    this.postsSubject = new BehaviorSubject<any[]>(initialPosts); // Creating a new subject with the posts found in local storage
    
    if (initialPosts.length === 0) { // Checks if there are no saved posts and creates a default test post
      const testPost = {
        id: this.generateId(), // Ussing the function generateId that is created below
        title: 'Test Post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec n unc.',
        thumbnailUrl: 'https://media.istockphoto.com/id/1084742460/photo/flat-earth.webp?a=1&b=1&s=612x612&w=0&k=20&c=TF7KgvPgBo1koKcC4pta8Zs5vynKt1gYzbJwH3ATuWk=',
        creationDate: new Date(), // Built-in JavaScript function to get the current date and time
        reactions: 0,
        comments: [],
      };
      this.addPost(testPost); // Adding the test post to the list of posts
    }
  }

  // Generate a unique ID for each post
  private generateId(): string { 
    return Date.now().toString(); // Turning the current date and time into a string
  }

  // Fetch a specific post by ID
  getPost(id: string): Observable<any> { // Function that creates an observable to send the post to subscribers
    return new Observable(observer => { // Creates a custom observable that emits the post matching the given ID
      const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created below
      const post = posts.find(p => p.id === id); // Finding the post with the specified ID by using the built-in find function
      observer.next(post || null); // Using the next function to send the post to subscribers, or null if the post is not found
      observer.complete(); //Using the complete function (built-in in Observable) to signal to the subscribers that no more data will be sent
    });
  }

  // Function that returns an observable to send the list of posts to subscribers
  getPostsObservable(): Observable<any[]> { 
    return this.postsSubject.asObservable(); // Using the asObservable function to return the subject as an observable
  }

  // Function that fetches posts from local storage
  private getPostsFromStorage(): any[] {
    const storedPosts = localStorage.getItem(this.localStorageKey); // Fetching posts from local storage using the built-in getItem function and the key that is defined above
    return storedPosts ? JSON.parse(storedPosts) : []; // Parsing the posts from JSON format to an array, or returning an empty array if there are no posts
  }

  // Function that adds a new post to the list of posts
  addPost(newPost: any): void { // Using newPost as a paramete to add a new post, using void to indicate that the function does not return anything
    newPost.id = this.generateId(); // Generating a unique ID for the new post using the function generateId that is created above
    const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created above
    posts.push(newPost); // Adding the new post to the list of posts
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(posts); // Using the built-in next function to send the updated list of posts to subscribers
  }

  deletePost(id: string): void { // Function that deletes a post from the list of posts
    const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created above
    const updatedPosts = posts.filter(p => p.id !== id); // Filtering out the post with the specified ID using the built-in filter function
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(updatedPosts); // Using the built-in next function to send the updated list of posts to subscribers
  }
  

  updatePost(updatedPost: any): void { // Function that updates an existing post in the list of posts
    const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created above
    const updatedPosts = posts.map(p => (p.id === updatedPost.id ? updatedPost : p)); // Mapping over the list of posts and replacing the post with the specified ID with the updated post
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(updatedPosts); // Using the built-in next function to send the updated list of posts to subscribers
  }

  // Function that adds a comment to a post
  addComment(postId: string, comment: any): void {
    const posts = this.getPostsFromStorage();
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        // Skapa en kopia av kommentaren
        const newComment = { ...comment };
        if (!p.comments) {
          p.comments = [];
        }
        p.comments.push(newComment);
      }
      return p;
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts));
    this.postsSubject.next(updatedPosts);
  }

  // Function that increments the reactions of a post
  increaseReactions(postId: string): void { // Function that increments the reactions of a post
    const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created above
    const updatedPosts = posts.map(p => { // Mapping over the list of posts
      if (p.id === postId) { // Checking if the post ID matches the specified ID
        p.reactions++; // Incrementing the reactions of the post
      }
      return p; // Returning the post
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(updatedPosts); // Using the built-in next function to send the updated list of posts to subscribers
  }

  // Function that decrements the reactions of a post
  decreaseReactions(postId: string): void { // Function that decrements the reactions of a post
    const posts = this.getPostsFromStorage(); // Fetching posts from local storage using the function getPostsFromStorage that is created above
    const updatedPosts = posts.map(p => { // Mapping over the list of posts
      if (p.id === postId) { // Checking if the post ID matches the specified ID
        p.reactions--; // Decrementing the reactions of the post
      }
      return p; // Returning the post
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(updatedPosts); // Using the built-in next function to send the updated list of posts to subscribers
  }

}