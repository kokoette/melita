import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/api.services';
import { offer, offersResponse } from '../../core/models/offer.models';
import { Subject, timer, takeUntil, switchMap, tap, finalize} from 'rxjs';
import { HeaderComponent } from '../../layout/header/header.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SubscriptionComponent, SharedModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{

  store = inject(Store)
  router = inject(Router)
  apiService = inject(AuthService)
  dialog = inject(MatDialog)

  offers: offer[] = [];

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
    this.apiService.getOffers().pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (res:offersResponse) => {
        this.offers = this.sortOffer(res.offers);
      },
      error: (err) => {
        this.error = err
        console.error('Error fetching offers:', err);
      }
    });
  }

  openPopup(offer:offer): void {
    this.dialog.open(SubscriptionComponent, {
      width: '100vh',
      data: offer
    });
  }

  navigateToSubscription(id:number){
    this.router.navigateByUrl(`/subscription/${id}`)
  }

  trackById(index: number, offer: offer) {
    return offer.id
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
