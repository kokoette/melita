import { Component, Inject, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/api.services';
import { offer, subscription, subscriptionResponse } from '../../core/models/offer.models';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit{


  dialogRef = inject(MatDialogRef<SubscriptionComponent>)
  loading = false;
  error: string | null = null;
  subscriptions: subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: offer
  ){}

  store = inject(Store)
  router = inject(Router)
  apiService = inject(AuthService)
  route = inject(ActivatedRoute)

  isLoading = false
  ngOnInit(){
    this.getSubscription()
  }

  getSubscription(){
    this.loading = true;

    this.error = null
    this.apiService.getSubscriptionById(this.data.id).pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (res:subscriptionResponse) => {
        this.subscriptions = this.sortSubscriptions(res.subscriptions)
      },
      error: (err) => {
        this.error = err
        console.error('Error fetching Subscriptions:', err);
      }
    });
  }

  sortSubscriptions(data:subscription[]):subscription[] {
    return data.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison === 0) {
        // If names are the same, compare by 'line'
        return a.line - b.line;
      }
      return nameComparison;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
