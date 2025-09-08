import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { engineeringYears } from '../shared/constants/years';
import { engineeringUniversities } from '../shared/constants/universities';
import { engineeringBranches } from '../shared/constants/branches';
import { engineeringColleges } from '../shared/constants/colleges';
import { CommonModule } from '@angular/common';
import { University } from '../shared/models/university.model';
import { Year } from '../shared/models/year.model';
import { Branch } from '../shared/models/branch.model';
import { College } from '../shared/models/college.model';
import { NotificationService } from '../shared/services/notification.service';
import { User } from '../state/user-state/user.model';
import { UserActions } from '../state/user-state/user.actions';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { getIsLoading } from '../state/user-state/user.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { engineeringSemisters } from '../shared/constants/semesters';
import { Semester } from '../shared/models/semester.model';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  activeForm: 'login' | 'signup' = 'signup';

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private store = inject(Store);

  universities = engineeringUniversities;
  branches = engineeringBranches;
  years = engineeringYears;
  colleges = engineeringColleges;
  semisters = engineeringSemisters;

  filteredUniversities!: Observable<University[]>;
  filteredBranches!: Observable<Branch[]>;
  filteredYears!: Observable<Year[]>;
  filteredColleges!: Observable<College[]>;
  filteredSemesters!: Observable<Semester[]>;
  hidePassword : boolean = true;

  isLoading$ : Observable<boolean | undefined> = this.store.select(getIsLoading);

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      college: ['', Validators.required],
      university: ['', Validators.required],
      branch: ['', Validators.required],
      year: ['', [Validators.required]],
      semester: ['', [Validators.required]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.handleOptionFiltering();
  }

  signUpWithEmailAndPassword(){
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const password = formValue.password;
      const newUser: User = {
        name: formValue.name,
        email: formValue.email,
        collegeId: formValue.college.collegeId,
        collegeName: formValue.college.name,
        universityId : formValue.university.universityId,
        universityName: formValue.university.name,
        branchId: formValue.branch.branchId,
        branchName : formValue.branch.name,
        yearId: formValue.year.yearId,
        yearName: formValue.year.name,
        semesterId: formValue.semester.semesterId,
        semesterName: formValue.semester.name
      };
      this.store.dispatch(UserActions.signUpWithEmailAndPassword({user : newUser,password }));
    } else {
      this.notificationService.showError('Please fill all required signup fields correctly.');
      this.signupForm.markAllAsTouched();
    }
  }

  signUpWithGoogle(isLoginForm : boolean) {
    if (this.signupForm.valid || isLoginForm) {
      const formValue = this.signupForm.value;
      const newUser: User = {
        name: formValue.name,
        email: formValue.email,
        collegeId: formValue.college.collegeId,
        collegeName: formValue.college.name,
        universityId : formValue.university.universityId,
        universityName: formValue.university.name,
        branchId: formValue.branch.branchId,
        branchName : formValue.branch.name,
        yearId: formValue.year.yearId,
        yearName: formValue.year.name,
        semesterId: formValue.semester.semesterId,
        semesterName: formValue.semester.name
      };
      this.store.dispatch(UserActions.signUpWithGoogle({user : newUser,isLoginForm}));
    } else {
      this.notificationService.showError('Please fill all required signup fields correctly.');
      this.signupForm.markAllAsTouched();
    }
  }
  
  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(UserActions.login({ email, password }));
    } else {
      this.notificationService.showError('Please enter valid login credentials.');
      this.loginForm.markAllAsTouched(); 
    }
  }

  handleOptionFiltering(){
    this.filteredColleges = this.signupForm.get('college')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterColleges(value))
    );

    this.filteredUniversities = this.signupForm.get('university')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterUniversities(value))
    );

    this.filteredBranches = this.signupForm.get('branch')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterBranches(value))
    );

    this.filteredYears = this.signupForm.get('year')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterYears(value))
    );

    this.filteredSemesters = this.signupForm.get('semester')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterSemesters(value))
    );
  }

  filterColleges(value: College | string): College[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.colleges.filter((college) => college.name.toLowerCase().includes(filterValue));
  }

  filterSemesters(value: Semester | string): Semester[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.semisters.filter((semister) => semister.name.toLowerCase().includes(filterValue));
  }

  filterUniversities(value: University | string): University[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.universities.filter((university) =>
      university.name.toLowerCase().includes(filterValue)
    );
  }

  filterBranches(value: Branch | string): Branch[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.branches.filter((branch) => branch.name.toLowerCase().includes(filterValue));
  }

  filterYears(value: Year | string): Year[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.years.filter((year) => year.name.toLowerCase().includes(filterValue));
  }

  displayCollegeFn(college: College): string {
    return college && college.name ? college.name : '';
  }

  displayUniversityFn(university: University): string {
    return university && university.name ? university.name : '';
  }

  displayBranchFn(branch: Branch): string {
    return branch && branch.name ? branch.name : '';
  }

  displayYearFn(year: Year): string {
    return year && year.name ? year.name : '';
  }

  displaySemisterFn(semester: Semester): string {
    return semester && semester.name ? semester.name : '';
  }
}
