import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // To allow routing
import { CommonModule } from '@angular/common';  // To allow standard direktives (*ngIf, *ngFor etc) in standalone components


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showCreateNewPostLink: boolean = false; 

  // Function that toggles between showing and not showing the link
  toggleCreateNewPostLink() {
    this.showCreateNewPostLink = !this.showCreateNewPostLink;
  }
}