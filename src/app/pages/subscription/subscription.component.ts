import { Component, Inject, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, finalize, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/api.services';
import { offer, subscription } from '../../core/models/offer.models';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent {


  dialogRef = inject(MatDialogRef<SubscriptionComponent>)
  loading: boolean = false;
  error: string | null = null;
  subscriptions: subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: offer
  ){}

  store = inject(Store)
  router = inject(Router)
  apiService = inject(AuthService)
  route = inject(ActivatedRoute)

  isLoading:boolean = false
  ngOnInit(){
    this.getSubscription()
  }

  getSubscription(){
    this.loading = true;

    this.error = null
    this.apiService.getSubscriptionById(this.data.id).pipe(
      catchError((err) => {
        if (err.status === 0) {
          // Network error or server is down
          this.error = 'Network error: Please check your internet connection.';
        } else if (err.status === 404) {
          this.error = 'Subscriptions not found.';
        } else {
          this.error = 'An unexpected error occurred. Please try again later.';
        }

        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (res:any) => {
        this.subscriptions = res.subscriptions;
        console.log('sub', this.subscriptions);
      },
      error: (err) => {
        console.error('Error fetching offers:', err);
      }
    });
  }

  visibleUsage = new Set<number>();

  toggleUsage(cardId: number) {
    if (this.visibleUsage.has(cardId)) {
      this.visibleUsage.delete(cardId);
    } else {
      this.visibleUsage.add(cardId);
    }
  }

  // Utility method to provide different icons
  getIcon(type: string) {
    switch (type) {
      case 'MOBILE':
        return 'assets/icons/mobile-icon.svg';
      case 'TELEVISION':
        return 'assets/icons/tv-icon.svg';
      case 'INTERNET':
        return 'assets/icons/internet-icon.svg';
      case 'TELEPHONY':
        return 'assets/icons/phone-icon.svg';
      default:
        return 'assets/icons/default-icon.svg';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
