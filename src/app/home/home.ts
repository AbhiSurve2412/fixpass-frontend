import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from '../shared/services/notification.service';
import { Store } from '@ngrx/store';
import { getIsAuthenticated, getIsLoading } from '../state/user-state/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  getEngineeringYears,
  isYearsLoading,
  getEngineeringBranches,
  isBranchesLoading,
  getEngineeringColleges,
  isCollegesLoading,
  getEngineeringUniversities,
  isUniversitiesLoading,
  getEngineeringSemesters,
  isSemestersLoading,
} from '../state/study-material/study-material.selectors';
import { User } from '../state/user-state/user.model';
import { UserActions } from '../state/user-state/user.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  activeForm: 'login' | 'signup' = 'signup';
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  hidePassword = true;

  private fb = inject(FormBuilder);
  private notify = inject(NotificationService);
  private store = inject(Store);

  years = toSignal(this.store.select(getEngineeringYears), { initialValue: [] });
  branches = toSignal(this.store.select(getEngineeringBranches), { initialValue: [] });
  colleges = toSignal(this.store.select(getEngineeringColleges), { initialValue: [] });
  universities = toSignal(this.store.select(getEngineeringUniversities), { initialValue: [] });
  semesters = toSignal(this.store.select(getEngineeringSemesters), { initialValue: [] });

  yearsLoading = toSignal(this.store.select(isYearsLoading), { initialValue: false });
  branchesLoading = toSignal(this.store.select(isBranchesLoading), { initialValue: false });
  collegesLoading = toSignal(this.store.select(isCollegesLoading), { initialValue: false });
  universitiesLoading = toSignal(this.store.select(isUniversitiesLoading), { initialValue: false });
  semestersLoading = toSignal(this.store.select(isSemestersLoading), { initialValue: false });

  isUserLoggedIn = toSignal(this.store.select(getIsAuthenticated));
  authLoading = toSignal(this.store.select(getIsLoading));

  isLoading = computed(() => this.authLoading());

  filteredColleges$!: Observable<any[]>;
  filteredUniversities$!: Observable<any[]>;
  filteredBranches$!: Observable<any[]>;
  filteredYears$!: Observable<any[]>;
  filteredSemesters$!: Observable<any[]>;

  ngOnInit(): void {
    this.buildForms();
    this.setupAutocompleteFilters();
  }

  private buildForms(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      college: ['', Validators.required],
      university: [{ value: null, disabled: true }, Validators.required],
      branch: [{ value: null, disabled: true }, Validators.required],
      year: [{ value: null, disabled: true }, Validators.required],
      semester: [{ value: null, disabled: true }, Validators.required],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    const defaultUniversity = this.universities().find(u => u.universityId === '1') ?? this.universities()[0];
    const defaultBranch = this.branches().find(b => b.branchId === '1') ?? this.branches()[0];
    const defaultYear = this.years().find(y => y.yearId === '3') ?? this.years()[0];
    const defaultSemester = this.semesters().find(s => s.semesterId === '1-endsem') ?? this.semesters()[0];
    this.signupForm.patchValue({
      university: defaultUniversity,
      branch: defaultBranch,
      year: defaultYear,
      semester: defaultSemester,
    });
  }

  private setupAutocompleteFilters(): void {
    const colleges$ = this.store.select(getEngineeringColleges);
    const universities$ = this.store.select(getEngineeringUniversities);
    const branches$ = this.store.select(getEngineeringBranches);
    const years$ = this.store.select(getEngineeringYears);
    const semesters$ = this.store.select(getEngineeringSemesters);

    this.filteredColleges$ = combineLatest([
      this.signupForm.get('college')!.valueChanges.pipe(startWith('')),
      colleges$,
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredUniversities$ = combineLatest([
      this.signupForm.get('university')!.valueChanges.pipe(startWith('')),
      universities$,
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredBranches$ = combineLatest([
      this.signupForm.get('branch')!.valueChanges.pipe(startWith('')),
      branches$,
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredYears$ = combineLatest([
      this.signupForm.get('year')!.valueChanges.pipe(startWith('')),
      years$,
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredSemesters$ = combineLatest([
      this.signupForm.get('semester')!.valueChanges.pipe(startWith('')),
      semesters$,
    ]).pipe(map(([input, list]) => this.filter(list, input)));
  }

  filter<T extends { name: string }>(source: T[], value: string | T): T[] {
    const term = typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() ?? '';
    return source.filter(item => item.name.toLowerCase().includes(term));
  }

  displayFn = (item: any): string => (item?.name ? item.name : '');

  signUpWithEmailAndPassword(): void {
    if (!this.signupForm.valid) {
      this.notify.showError('Please fill all required signup fields correctly.');
      this.signupForm.markAllAsTouched();
      return;
    }
    const raw = this.signupForm.getRawValue();
    const user: User = {
      name: raw.name,
      email: raw.email,
      collegeId: raw.college.collegeId,
      collegeName: raw.college.name,
      universityId: raw.university.universityId,
      universityName: raw.university.name,
      branchId: raw.branch.branchId,
      branchName: raw.branch.name,
      yearId: raw.year.yearId,
      yearName: raw.year.name,
      semesterId: raw.semester.semesterId,
      semesterName: raw.semester.name,
    };
    this.store.dispatch(UserActions.signUpWithEmailAndPassword({ user, password: raw.password }));
  }

  signUpWithGoogle(isLoginForm: boolean): void {
    if (!isLoginForm && !this.signupForm.valid) {
      this.notify.showError('Please fill all required signup fields correctly.');
      this.signupForm.markAllAsTouched();
      return;
    }
    const raw = this.signupForm.getRawValue();
    const user: User = {
      name: raw.name,
      email: raw.email,
      collegeId: raw.college?.collegeId,
      collegeName: raw.college?.name,
      universityId: raw.university?.universityId,
      universityName: raw.university?.name,
      branchId: raw.branch?.branchId,
      branchName: raw.branch?.name,
      yearId: raw.year?.yearId,
      yearName: raw.year?.name,
      semesterId: raw.semester?.semesterId,
      semesterName: raw.semester?.name,
    };
    this.store.dispatch(UserActions.signUpWithGoogle({ user, isLoginForm }));
  }

  onLoginSubmit(): void {
    if (!this.loginForm.valid) {
      this.notify.showError('Please enter valid login credentials.');
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(UserActions.login({ email, password }));
  }
}