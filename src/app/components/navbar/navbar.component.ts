import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // För att kunna använda *ngIf i standalone


@Component({
  selector: 'app-navbar',
  standalone: true,  // Lägg till denna
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Boolean för att toggla synligheten för länken
  showCreateNewPostLink = false; 

  // Metod för att toggla värdet på showCreateNewPostLink
  toggleCreateNewPostLink() {
    this.showCreateNewPostLink = !this.showCreateNewPostLink;
  }
}