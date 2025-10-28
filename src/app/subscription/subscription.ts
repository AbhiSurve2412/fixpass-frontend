import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { getLoggedInUser } from '../state/user-state/user.selectors';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { UserActions } from '../state/user-state/user.actions';
import { User } from '../state/user-state/user.model';
import { NotificationService } from '../shared/services/notification.service';

declare var Razorpay: any;

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './subscription.html',
  styleUrls: ['./subscription.scss'],
})
export class Subscription {
  private store = inject(Store);
  private firestore = inject(Firestore);
  private notification = inject(NotificationService); 

  userDetails = toSignal(this.store.select(getLoggedInUser));

  startPayment() {
    const user = this.userDetails();
  
    if (!user) {
      this.notification.showWarning('⚠️ Please log in to subscribe.');
      return;
    }
  
    const options = {
      key: 'rzp_test_RYW06bqMZwTbx3', 
      amount: 9900,
      currency: 'INR',
      name: 'FixPass Premium',
      description: 'Get full access to all subjects and PYQs',
      image: 'https://fixpass-frontend.vercel.app/assets/logo.png',
      handler: () => {
        const updatedUser: User = {
          ...user,
          isProUser: true,
        };
  
        this.store.dispatch(UserActions.updateUserProfile({ user: updatedUser }));
      },
      prefill: {
        name: user.name,
        email: user.email,
      }
    };
  
    const rzp = new Razorpay(options);
    rzp.open();
  
    rzp.on('payment.failed', () => {
      this.notification.showError('❌ Payment failed. Please try again.');
    });
  }
}
