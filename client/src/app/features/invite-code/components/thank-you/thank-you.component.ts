import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent {
  constructor(private router: Router) {}

  goToJoinBeta() {
    this.router.navigate(['/join-beta']);
  }
}
