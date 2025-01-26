import { Injectable } from '@angular/core'; // Allowing the service to be injected into other components
import { BehaviorSubject, Observable } from 'rxjs'; // Allows subscribers to listen for changes in the data

@Injectable({
  providedIn: 'root', // Makes the service available to the entire application
})

export class PostService { // Creating a service to manage blog posts
  private localStorageKey = 'blogPosts'; // Private key for storing posts in local storage
  private postsSubject: BehaviorSubject<any[]>; // Private subject to store the list of posts
  private isAdminMode = new BehaviorSubject<boolean>(false); // Private subject to store the admin mode state
  
  constructor() { 
    const initialPosts = this.getPostsFromStorage(); // Initializes the service by fetching posts from local storage and setting up a reactive state
    this.postsSubject = new BehaviorSubject<any[]>(initialPosts); // Creating a new subject with the posts found in local storage
    
    if (initialPosts.length === 0) { // Checks if there are no saved posts and creates a default test post
      const testPost = {
        id: this.generateId(), // Ussing the function generateId that is created below
        title: 'Why the Earth is Totally, Absolutely, 100% Flat (test post)', 
        body: 'Let’s start with the obvious: have you ever felt the Earth spinning at 1,000 miles per hour? Exactly. If it were round, wouldn’t we all just fly off like leaves in a tornado? And don’t get me started on airplanes. Pilots would need to constantly dip the nose of the plane to account for the curve of the Earth—yet they don’t. Coincidence? I think not. Now, about water. Have you ever seen water curve? Water is always flat in a glass or a lake. If Earth were round, wouldn’t we have waterfalls flowing uphill? I mean, come on! Gravity gets all the credit, but I think it’s just Earth’s way of saying, “I’m flat, deal with it.” And explain this: if Earth were a globe, cats would’ve knocked everything off it by now. Flat Earth just makes sense—they’re the real rulers of the disc. Sure, some people say there’s “proof” of a round Earth, like photos from space. But have you heard of Photoshop? Case closed. At the end of the day, I’m not saying I’m a scientist, but if pancakes are flat, and pancakes are delicious, then Earth being flat isn’t such a bad thing either.',
        thumbnailUrl: 'https://media.istockphoto.com/id/1084742460/photo/flat-earth.webp?a=1&b=1&s=612x612&w=0&k=20&c=TF7KgvPgBo1koKcC4pta8Zs5vynKt1gYzbJwH3ATuWk=',
        creationDate: new Date(), // Built-in JavaScript function to get the current date and time
        reactions: 0,
        comments: [],
      };
      this.addPost(testPost); // Adding the test post to the list of posts
    }
  }

  // Function that returns an observable to send the admin mode state to subscribers  
  getAdminMode(): Observable<boolean> { 
    return this.isAdminMode.asObservable(); // Using the asObservable function to return the subject as an observable
  }

  // Function that sets the admin mode state
  setAdminMode(isAdmin: boolean): void { 
    this.isAdminMode.next(isAdmin);
  }

  // Generate a unique ID for each post
  private generateId(): string { 
    return Date.now().toString(); // Turning the current date and time into a string
  }

  // Fetch a specific post by ID
  // Function that creates an observable to send the post to subscribers
  getPost(id: string): Observable<any> { 
    return new Observable(observer => { // Creates a custom observable that emits the post matching the given ID
      const posts = this.getPostsFromStorage(); 
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
    const storedPosts = localStorage.getItem(this.localStorageKey);
    return storedPosts ? JSON.parse(storedPosts) : []; // Parsing the posts from JSON format to an array, or returning an empty array if there are no posts
  }


  addPost(newPost: any): void { // Using newPost as a paramete to add a new post to the list of posts
    newPost.id = this.generateId(); // Generating a unique ID for the new post using the function generateId that is created above
    const posts = this.getPostsFromStorage(); 
    posts.push(newPost); // Adding the new post to the list of posts using the built-in push function
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts)); 
    this.postsSubject.next(posts); 
  }

  deletePost(id: string): void { 
    const posts = this.getPostsFromStorage(); 
    const updatedPosts = posts.filter(p => p.id !== id); // Filtering out the post with the specified ID using the built-in filter function
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts));
    this.postsSubject.next(updatedPosts); 
  }
  
  // Function that updates an existing post in the list of posts
  updatePost(updatedPost: any): void { 
    const posts = this.getPostsFromStorage(); 
    const updatedPosts = posts.map(p => (p.id === updatedPost.id ? updatedPost : p)); // Using the built-in map function to update the post with the specified ID
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); 
    this.postsSubject.next(updatedPosts); 
  }

  addComment(postId: string, comment: any): void {
    const posts = this.getPostsFromStorage();
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        // Craate a local copy of the comment object to avoid modifying the original object
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

  increaseReactions(postId: string): void { 
    const posts = this.getPostsFromStorage(); 
    const updatedPosts = posts.map(p => {
      if (p.id === postId) { 
        p.reactions++; 
      }
      return p; // Returning the post
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); // Saving the updated list of posts to local storage using the built-in setItem function and the key that is defined above
    this.postsSubject.next(updatedPosts); // Using the built-in next function to send the updated list of posts to subscribers
  }

  decreaseReactions(postId: string): void { 
    const posts = this.getPostsFromStorage(); 
    const updatedPosts = posts.map(p => { 
      if (p.id === postId) { 
        if (p.reactions > 0) 
        p.reactions--; 
      }
      return p; // Returning the post
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedPosts)); 
  }

}