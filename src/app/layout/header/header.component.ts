import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
  <div class="bg-white p-3 px-20 border-b-2 border-gray-100 flex justify-between sticky">
    <img class="cursor-pointer h-[48px] mr-auto" src="melita_logo.svg" alt="melita logo">
    <div class="ml-5 flex items-center">
      <span class="flex items-center cursor-pointer">
        <img src="blank-profile-picture.png" alt="" class="h-12 w-12 mx-3 rounded-full">
      </span>
      <button mat-button color="tertiary" (click)="onLogout()"> <mat-icon>logout</mat-icon>  Logout</button>
    </div>
  </div>
  `,
  styles: `

  `,
})
export class HeaderComponent {
  store = inject(Store)

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

}
