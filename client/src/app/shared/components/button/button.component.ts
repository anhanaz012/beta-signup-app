import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick.emit()"
      [ngClass]="baseClasses"
    >
      @if (loading) {
        <span
          class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
        ></span>
      }
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() label: string = 'Submit';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';

  @Output() onClick = new EventEmitter<void>();

  get baseClasses(): string {
    const base =
      ' py-3 flex rounded-full cursor-pointer px-6 min-w-fit font-medium text-sm transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary: 'bg-[#7355a1] text-white hover:bg-[#6e4f9a] active:scale-95',
      secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 active:scale-95',
    };
    return `${base} ${variants[this.variant]}`;
  }
}
