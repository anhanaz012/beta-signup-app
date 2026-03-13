import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent {
  constructor(private router: Router) {}

  goToJoinBeta() {
    this.router.navigate(['/join-beta']);
  }
}
