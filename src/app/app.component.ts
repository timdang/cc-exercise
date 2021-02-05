import { Component } from '@angular/core';

import { CreditForm } from './models/creditCardForm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cc-exercise';

  handleFormSubmission(event: CreditForm): void {
    console.log('emitted:', event);
  }
}
