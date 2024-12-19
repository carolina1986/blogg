import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutMePageComponent } from './pages/about-me-page/about-me-page.component';
import { SinglePostPageComponent } from './pages/single-post-page/single-post-page.component';
import { CreateNewPostPageComponent } from './pages/create-new-post-page/create-new-post-page.component';
import { PostService } from './services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'about-me-page', component: AboutMePageComponent },
    { path: 'create-new-post-page', component: CreateNewPostPageComponent },
    { path: 'single-post/:id', component: SinglePostPageComponent }, // Ändra denna
];

