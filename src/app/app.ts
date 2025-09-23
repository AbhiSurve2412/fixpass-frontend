import { Component, inject, OnInit, signal, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Profile } from './profile/profile';
import { UserActions } from './state/user-state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    Profile
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' } }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private store = inject(Store);
  protected readonly title = signal('fix-pass');
  @ViewChild('profileDrawer') profileDrawer!: MatDrawer;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.store.dispatch(UserActions.getUserById({ userId }));
      }
    }
  }

  openProfile(): void {
    this.profileDrawer.open();
  }

  closeProfile(): void {
    this.profileDrawer.close();
  }
}
