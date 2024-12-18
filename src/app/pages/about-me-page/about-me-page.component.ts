import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about-me-page',
  standalone: true,  
  imports: [RouterOutlet],
  templateUrl: './about-me-page.component.html',
  styleUrl: './about-me-page.component.css'
})
export class AboutMePageComponent {

}
