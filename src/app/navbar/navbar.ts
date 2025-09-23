import { Component, Output, ViewChild, inject,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user-state/user.actions';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  @Output() openDrawer = new EventEmitter<void>();

  @ViewChild('profileDrawer') profileDrawer!: MatDrawer;

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  openProfileDrawer(){
    this.openDrawer.emit();
  }

  logOutUser(){
    this.store.dispatch(UserActions.logout());
  }

  navigateToStudyMaterial(){
    this.router.navigate(['/study-material']);
  }
}
