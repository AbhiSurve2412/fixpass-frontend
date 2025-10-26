import { Component, Output, ViewChild, inject, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user-state/user.actions';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { getIsAuthenticated } from '../state/user-state/user.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatSidenavModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  @Output() openDrawer = new EventEmitter<void>();
  @ViewChild('profileDrawer') profileDrawer!: MatDrawer;

  currentRoute: string = '';
  isUserLoggedIn = toSignal(this.store.select(getIsAuthenticated));

  ngOnInit() {
    this.currentRoute = this.router.url;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  openProfileDrawer() {
    this.openDrawer.emit();
  }

  logOutUser() {
    this.store.dispatch(UserActions.logout());
  }

  navigateToStudyMaterial() {
    this.router.navigate(['/study-material']);
  }
}
