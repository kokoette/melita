import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isAuthenticated = localStorage.getItem('token')

  if(isAuthenticated !== null) {
    return true;
  }
  router.navigateByUrl('/auth')
  return false;
};
