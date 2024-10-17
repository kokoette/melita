import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/api.services';
import { offer } from '../../core/models/offer.models';
import { Subject, timer, takeUntil, switchMap, tap, finalize, catchError, of } from 'rxjs';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SharedModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  store = inject(Store)
  router = inject(Router)
  api = inject(AuthService)
  offers: any;

  countdownSeconds = 10;
  countdownMessage = '';
  isButtonDisabled = false;
  loading = false;
  error: string | null = null;

  private stopCountdown$ = new Subject<void>(); // Subject to control the countdown

  ngOnInit() {
    this.loadOffers()
  }

  loadOffers() {
    this.startCountdown();
    this.loading = true;

    this.error = null
    this.api.getOffers().pipe(
      catchError((err) => {
        // Customize the error message based on the type of error
        if (err.status === 0) {
          // Network error or server is down
          this.error = 'Network error: Please check your internet connection.';
        } else if (err.status === 404) {
          this.error = 'Offers not found.';
        } else {
          this.error = 'An unexpected error occurred. Please try again later.';
        }

        return of([]); // Return an empty array to keep the UI functional
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (res:any) => {
        this.offers = this.sortOffer(res.offers);
        console.log('offers', this.offers);
      },
      error: (err) => {
        console.error('Error fetching offers:', err);
      }
    });
  }

  navigateToSubscription(id:number){
    this.router.navigateByUrl(`/subscription/${id}`)
  }

  trackById(index: number, offers: any) {
    return offers.id
  }

  sortOffer(data: offer[]): offer[] {
    return data.sort((a, b) => {

      // Convert date string to timestamp for sorting to work as it should
      const dateA = new Date(a.contractStartDate).getTime();
      const dateB = new Date(b.contractStartDate).getTime();

      return dateA - dateB;
    });
  }


  startCountdown() {
    if (this.isButtonDisabled) return; // to prevent multiple clicks

    this.isButtonDisabled = true;

    // Create a timer that emits values every second
    timer(0, 1000)
    .pipe(
      takeUntil(this.stopCountdown$), // Stop the countdown if interrupted
      tap((count) => {
        const remainingTime = this.countdownSeconds - count - 1;
        if (remainingTime >= 0) {
          // Update the message for the button
          this.countdownMessage = `${remainingTime}`;
        }
      }),
      // When countdown completes, reset the button state
      switchMap((count) => {
        if (count >= this.countdownSeconds) {
          this.resetButton(); // Reset button when countdown finishes
          return []; // Return an empty observable to complete the stream
        }
        return []; // Continue the stream
      })
    )
    .subscribe();
  }

  resetButton() {
    this.isButtonDisabled = false;
    this.countdownMessage = '';
    this.stopCountdown$.next();
    this.stopCountdown$.complete();
    this.stopCountdown$ = new Subject<void>();
  }


}
