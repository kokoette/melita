import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent { }
