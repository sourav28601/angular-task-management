import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const outerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('user_data');

  if (userData) {
    return true;
  } else {
    router.navigate(['/login']);
    return true;
  }
};
