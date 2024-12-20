import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PostService } from './services/post.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    PostService
  ]
};