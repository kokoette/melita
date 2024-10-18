import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FirstWordPipe } from '../core/pipes/get-first-word.pipe';
import { OfferStatusPipe } from '../core/pipes/offer-status.pipe';
import { MatDialogModule } from '@angular/material/dialog';

const MODULES = [
  RouterOutlet,
  RouterLink,
  FormsModule,
  CommonModule,
  ReactiveFormsModule,

  //Material modules
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule
]

const PIPES = [
  OfferStatusPipe,
  FirstWordPipe
]

@NgModule({
  // Easier approach to reduce redundancy
  imports: [...PIPES, ...MODULES],
  exports: [...PIPES, ...MODULES],
})
export class SharedModule {}
