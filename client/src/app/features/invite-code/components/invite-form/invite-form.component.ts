import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InviteService } from '../../../../core/services/invite.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-invite-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputFieldComponent, RouterLink],
  templateUrl: './invite-form.component.html',
})
export class InviteFormComponent {
  codeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(12),
  ]);

  isLoading = false;
  errorMessage = '';

  constructor(
    private inviteService: InviteService,
    private router: Router,
  ) {}

  get codeError(): string {
    if (!this.codeControl.touched) return '';
    if (this.codeControl.hasError('required')) return 'Invite code is required';
    if (this.codeControl.hasError('minlength')) return 'Code must be at least 4 characters';
    if (this.codeControl.hasError('maxlength')) return 'Code must be at most 12 characters';
    return '';
  }

  onSubmit() {
    if (this.codeControl.invalid) {
      this.codeControl.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.inviteService.verifyCode({ code: this.codeControl.value! }).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if (res.is_valid) {
          sessionStorage.setItem('invite_verified', 'true');
          this.router.navigate(['/thank-you']);
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (error) => {
        console.log('error', error);
        this.isLoading = false;
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}
