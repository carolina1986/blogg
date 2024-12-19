// main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from './app/services/post.service';
import { CommonModule } from '@angular/common';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    PostService  // Lägg till PostService här
  ]
}).catch((err) => console.error(err));