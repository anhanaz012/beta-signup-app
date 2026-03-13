import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const inviteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isVerified = sessionStorage.getItem('invite_verified');

  if (isVerified === 'true') {
    return true;
  }

  router.navigate(['/invite']);
  return false;
};
