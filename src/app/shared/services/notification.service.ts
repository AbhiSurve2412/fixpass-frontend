import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 50000000000000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  showSuccess(message: string) {
    this.snackBar.open(message, '✖', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, '✖', {
      ...this.defaultConfig,
      panelClass: ['snackbar-error']
    });
  }

  showWarning(message: string) {
    this.snackBar.open(message,'✖', {
      ...this.defaultConfig,
      panelClass: ['snackbar-warning']
    });
  }

  showInfo(message: string) {
    this.snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-info']
    });
  }
}
