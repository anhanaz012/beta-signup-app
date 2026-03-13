import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { WaitlistService } from '../../../../core/services/waitlist.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-beta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputFieldComponent, RouterLink],
  templateUrl: './join-beta-form.component.html',
})
export class JoinBetaFormComponent {
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  private waitlistService = inject(WaitlistService);
  private cdr = inject(ChangeDetectorRef);

  get nameError(): string {
    const control = this.form.get('name')!;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Name is required';
    if (control.hasError('minlength')) return 'Name must be at least 3 characters';
    if (control.hasError('maxlength')) return 'Name must be at most 100 characters';
    return '';
  }

  get emailError(): string {
    const control = this.form.get('email')!;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Email is required';
    if (control.hasError('email')) return 'Please enter a valid email';
    return '';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.waitlistService
      .joinWaitlist({
        name: this.form.value.name!,
        email: this.form.value.email!,
      })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.successMessage = res.message;
            this.form.reset();
            // Hide success message after 2 seconds
            setTimeout(() => {
              this.successMessage = '';
              this.cdr.detectChanges();
            }, 2000);
          } else {
            this.errorMessage = res.message;

            // Hide error message after 2 seconds
            setTimeout(() => {
              this.errorMessage = '';
              this.cdr.detectChanges();
            }, 2000);
          }

          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Something went wrong. Please try again.';

          // Hide error message after 2 seconds
          setTimeout(() => {
            this.errorMessage = '';
            this.cdr.detectChanges();
          }, 2000);

          this.cdr.detectChanges();
        },
      });
  }
}
