// src/app/auth/services/user.service.ts
import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { EMPTY, from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../../state/user-state/user.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');
  private notificationService = inject(NotificationService);

  // -------------------------------
  // SIGNUP
  // -------------------------------
  signupWithEmailAndPassword(user: User, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, user.email, password)).pipe(
      switchMap((cred: UserCredential) => {
        const firebaseUser: FirebaseUser = cred.user;
        const userId = firebaseUser.uid;

        const userDocRef = doc(this.firestore, `users/${userId}`);
        const userData: User = { ...user, userId };

        return from(setDoc(userDocRef, userData)).pipe(map(() => userData));
      })
    );
  }

  // -------------------------------
  // LOGIN
  // -------------------------------
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) => {
        const userId = cred.user?.uid;
        const userDocRef = doc(this.firestore, `users/${userId}`);
        return from(getDoc(userDocRef)).pipe(
          map((docSnap) => {
            if (!docSnap.exists()) throw new Error('User not found in Firestore');
            return docSnap.data() as User;
          })
        );
      })
    );
  }

  // -------------------------------
  // LOGOUT
  // -------------------------------
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // -------------------------------
  // GET ALL USERS
  // -------------------------------
  getAllUsers(): Observable<User[]> {
    return from(getDocs(this.usersCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as User))
    );
  }

  // -------------------------------
  // GET USER BY ID
  // -------------------------------
  getUserById(userId: string): Observable<User | null> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => (docSnap.exists() ? (docSnap.data() as User) : null))
    );
  }

  // -------------------------------
  // UPDATE USER
  // -------------------------------
  updateUser(userId: string, updatedData: Partial<User>): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${userId}`);

    return from(updateDoc(userDocRef, updatedData)).pipe(
      map(
        () =>
          ({
            ...updatedData,
            userId,
          } as User)
      )
    );
  }

  // -------------------------------
  // SIGNUP WITH GOOGLE
  // -------------------------------
  signUpWithGoogle(newUser: Partial<User>,isLoginForm : boolean): Observable<User> {
    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((cred) => {
        const firebaseUser = cred.user;
        if (!firebaseUser?.email) {
          this.notificationService.showError('No email found for this Google account');
          return EMPTY;
        }

        // Check if input email matches Google account email
        if (newUser.email && newUser.email !== firebaseUser.email) {
          this.notificationService.showError('The provided email does not match the Google account email');
          return EMPTY;
        }

        const userId = firebaseUser.uid;
        const userDocRef = doc(this.firestore, `users/${userId}`);

        return from(getDoc(userDocRef)).pipe(
          switchMap((docSnap) => {
            if (docSnap.exists()  && !isLoginForm) {
              this.notificationService.showError('Account already exists. Please log in.');
              return EMPTY;
            }

            const userData: User = {
              userId,
              email: newUser.email ?? '',
              name: newUser.name || '',
              collegeName: newUser.collegeName || '',
              collegeId: newUser.collegeId || '',
              universityName: newUser.universityName || '',
              universityId: newUser.universityId || '',
              branchId: newUser.branchId || '',
              branchName: newUser.branchName || '',
              yearId: newUser.yearId || '',
              yearName: newUser.yearName || '',
              semesterId: newUser.semesterId || '',
              semesterName: newUser.semesterName || ''
            };
            return from(setDoc(userDocRef, userData)).pipe(map(() => userData));
          })
        );
      })
    );
}
}
