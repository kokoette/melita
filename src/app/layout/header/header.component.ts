import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';
import { selectLogoutLoading } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
  <div class="bg-white p-3 drop-shadow-sm  md:px-16 px-8 border-b-2 border-gray-100 flex justify-between sticky top-0 z-50">
    <img class="cursor-pointer sm:h-12 h-8 mr-auto" src="melita_logo.svg" alt="melita logo">
    <div class="ml-5 flex items-center">
      <span class="cursor-pointer hidden md:block">
        <img src="picture1.png" alt="" class="h-12 w-12 mx-3 rounded-full">
      </span>
      <button mat-button class="font-medium !text-[red]" (click)="onLogout()">
        @if (loading$ | async) {
          <mat-spinner color="secondary" [diameter]="24"></mat-spinner>
        } @else {
          <span class="flex items-center">
            <mat-icon>logout</mat-icon> &nbsp; Logout
          </span>
        }
      </button>
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

  loading$ = this.store.select(selectLogoutLoading)

}
