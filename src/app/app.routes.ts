import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { authGuard } from './core/route-guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[authGuard]
  },

  {
    path: 'subscription/:id',
    component: SubscriptionComponent,
    canActivate:[authGuard]
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: '**', redirectTo: 'auth' }
];
