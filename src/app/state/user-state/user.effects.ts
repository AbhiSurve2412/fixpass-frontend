// src/app/state/user-state/user.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../shared/services/user.service';
import { UserActions } from './user.actions';
import { NotificationService } from '../../shared/services/notification.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { mapFirebaseError } from '../../shared/utils/map-firebase-error';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private notification = inject(NotificationService);
  private router : Router = inject(Router)

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signUpWithEmailAndPassword),
      mergeMap(({ user, password }) =>
        this.userService.signupWithEmailAndPassword(user, password).pipe(
          map((newUser) => {
            this.notification.showSuccess('Signup successful!');
            this.router.navigate(['/study-material']);
            return UserActions.signUpSuccess({ user: newUser });
          }),
          catchError((error: FirebaseError) => {
            console.log(error);
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.signUpFailure({ error: msg }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((user) => {
            this.notification.showSuccess('Login successful!');
            this.router.navigate(['/study-material']);
            return UserActions.loginSuccess({ user });
          }),
          catchError((error: FirebaseError) => {
            console.log(error);
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.loginFailure({ error: msg }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userService.logout().pipe(
          map(() => {
            this.notification.showInfo('Logged out successfully.');
            this.router.navigate(['/home']);
            return UserActions.logoutSuccess();
          }),
          catchError((error: FirebaseError) => {
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.logoutFailure({ error: msg }));
          })
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      mergeMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => {
            if (!user)
              throw { code: 'auth/user-not-found', message: 'User not found' } as FirebaseError;
            this.notification.showInfo('User profile loaded');
            return UserActions.getUserByIdSuccess({ user });
          }),
          catchError((error: FirebaseError) => {
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.getUserByIdFailure({ error: msg }));
          })
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      mergeMap(({ user }) => {
        if (!user.userId) {
          const msg = 'User ID is required for update';
          this.notification.showWarning(msg);
          return of(UserActions.updateUserProfileFailure({ error: msg }));
        }
        return this.userService.updateUser(user.userId, user).pipe(
          map((updatedUser) => {
            this.notification.showSuccess('Profile updated successfully!');
            return UserActions.updateUserProfileSuccess({ user: updatedUser });
          }),
          catchError((error: FirebaseError) => {
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.updateUserProfileFailure({ error: msg }));
          })
        );
      })
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => {
            this.notification.showInfo('Users loaded successfully');
            return UserActions.loadUsersSuccess({ users });
          }),
          catchError((error: FirebaseError) => {
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.loadUsersFailure({ error: msg }));
          })
        )
      )
    )
  );

  signUpWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signUpWithGoogle),
      switchMap((action) =>
        this.userService.signUpWithGoogle(action.user,action.isLoginForm).pipe(
          map((newUser) => {
            this.notification.showSuccess('Google signup successful!');
            this.router.navigate(['/study-material']);
            return UserActions.signUpSuccess({ user: newUser });
          }),
          catchError((error: FirebaseError) => {
            const msg = mapFirebaseError(error);
            this.notification.showError(msg);
            return of(UserActions.signUpFailure({ error: msg }));
          })
        )
      )
    )
  );
}
