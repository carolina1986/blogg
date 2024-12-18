import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-create-new-post-page',
  standalone: true,  // Lägg till denna
  imports: [RouterOutlet],
  templateUrl: './create-new-post-page.component.html',
  styleUrls: ['./create-new-post-page.component.css']
})
export class CreateNewPostPageComponent {

}
