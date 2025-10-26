import {
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Signal,
  signal
} from '@angular/core';
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
import { User } from '../state/user-state/user.model';
import { UserActions } from '../state/user-state/user.actions';
import { Store } from '@ngrx/store';
import { getIsLoading, getLoggedInUser } from '../state/user-state/user.selectors';
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

@Component({
  selector: 'app-profile',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  @Output() closeDrawer = new EventEmitter<void>();

  signupForm!: FormGroup;
  private fb = inject(FormBuilder);
  private notify = inject(NotificationService);
  private store = inject(Store);

  years = toSignal(this.store.select(getEngineeringYears), { initialValue: [] });
  branches  = toSignal(this.store.select(getEngineeringBranches), { initialValue: [] });
  colleges = toSignal(this.store.select(getEngineeringColleges), { initialValue: [] });
  universities = toSignal(this.store.select(getEngineeringUniversities), { initialValue: [] });
  semesters = toSignal(this.store.select(getEngineeringSemesters), { initialValue: [] });

  yearsLoading = toSignal(this.store.select(isYearsLoading), { initialValue: false });
  branchesLoading = toSignal(this.store.select(isBranchesLoading), { initialValue: false });
  collegesLoading = toSignal(this.store.select(isCollegesLoading), { initialValue: false });
  universitiesLoading = toSignal(this.store.select(isUniversitiesLoading), { initialValue: false });
  semestersLoading = toSignal(this.store.select(isSemestersLoading), { initialValue: false });

  isLoading$ = this.store.select(getIsLoading);
  userDetails: Signal<User | undefined> = toSignal(this.store.select(getLoggedInUser));
  isEditMode = signal(false);

  filteredColleges$!: Observable<any[]>;
  filteredUniversities$!: Observable<any[]>;
  filteredBranches$!: Observable<any[]>;
  filteredYears$!: Observable<any[]>;
  filteredSemesters$!: Observable<any[]>;

  constructor() {
    effect(() => {
      this.patchForm();
      this.disableFormFields();
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.setupAutocompleteFilters();
  }

  private buildForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      college: ['', Validators.required],
      university: [{ value: null, disabled: true }, Validators.required],
      branch: [{ value: null, disabled: true }, Validators.required],
      year: [{ value: null, disabled: true }, Validators.required],
      semester: [{ value: null, disabled: true }, Validators.required],
    });
  }

  private disableFormFields(): void {
    const controls = ['email', 'name', 'college', 'university', 'branch', 'year', 'semester'];
    if (this.isEditMode()) {
      controls.forEach(c => this.signupForm.get(c)?.enable());
    } else {
      controls.forEach(c => this.signupForm.get(c)?.disable());
    }
  }

  private patchForm(): void {
    const user = this.userDetails();
    if (!user) return;

    const college = this.colleges().find(c => c.collegeId === user.collegeId) || null;
    const university = this.universities().find(u => u.universityId === user.universityId) || null;
    const branch = this.branches().find(b => b.branchId === user.branchId) || null;
    const year = this.years().find(y => y.yearId === user.yearId) || null;
    const semester = this.semesters().find(s => s.semesterId === user.semesterId) || null;
    console.log(branch);
    this.signupForm.patchValue({
      name: user.name,
      email: user.email,
      college,
      university,
      branch,
      year,
      semester
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
      colleges$
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredUniversities$ = combineLatest([
      this.signupForm.get('university')!.valueChanges.pipe(startWith('')),
      universities$
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredBranches$ = combineLatest([
      this.signupForm.get('branch')!.valueChanges.pipe(startWith('')),
      branches$
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredYears$ = combineLatest([
      this.signupForm.get('year')!.valueChanges.pipe(startWith('')),
      years$
    ]).pipe(map(([input, list]) => this.filter(list, input)));

    this.filteredSemesters$ = combineLatest([
      this.signupForm.get('semester')!.valueChanges.pipe(startWith('')),
      semesters$
    ]).pipe(map(([input, list]) => this.filter(list, input)));
  }

  filter<T extends { name: string }>(source: T[], value: string | T): T[] {
    const term = typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() ?? '';
    return source.filter(item => item.name.toLowerCase().includes(term));
  }

  displayFn = (item: any): string => item?.name ?? '';

  updateProfile(): void {
    if (!this.signupForm.valid) {
      this.notify.showError('Please fill all required fields correctly.');
      this.signupForm.markAllAsTouched();
      return;
    }

    const raw = this.signupForm.getRawValue();
    const updatedUser: User = {
      userId: this.userDetails()?.userId,
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
      semesterName: raw.semester.name
    };

    this.store.dispatch(UserActions.updateUserProfile({ user: updatedUser }));
    this.isEditMode.set(false);
  }

  closeProfilDrawer(): void {
    this.closeDrawer.emit();
  }

  setEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
  }
}