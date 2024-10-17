import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'subscription/:id',
    component: SubscriptionComponent,
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: '**', redirectTo: 'auth' }
];
