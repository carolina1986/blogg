import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-me-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.css'],
})
export class AboutMePageComponent {
  // Object to store the new message
  newMessage = {
    guestName: '',
    guestEmailAddress: '',
    guestMessage: '',
  };

  // Method used to submit the form
  onSubmit() {
    // Display the message details in an alert using JSON.stringify to format the object
    alert(`Message Details: ${JSON.stringify(this.newMessage, null, 2)}`);
  }
  
  resetForm() {
    this.newMessage = {
      guestName: '',
      guestEmailAddress: '',
      guestMessage: '',
    };
  }
}
