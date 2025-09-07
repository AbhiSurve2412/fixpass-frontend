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
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  activeForm: 'login' | 'signup' = 'signup';

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  universities = engineeringUniversities;
  branches = engineeringBranches;
  years = engineeringYears;
  colleges = engineeringColleges;

  filteredUniversities!: Observable<University[]>;
  filteredBranches!: Observable<Branch[]>;
  filteredYears!: Observable<Year[]>;
  filteredColleges!: Observable<College[]>;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      college: ['', Validators.required],
      university: ['', Validators.required],
      branch: ['', Validators.required],
      year: ['', [Validators.required]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.handleOptionFiltering();
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
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
    }
  }

  filterColleges(value: College | string): College[] {
    const filterValue =
      typeof value === 'string' ? value.toLowerCase() : value?.name?.toLowerCase() || '';
    return this.colleges.filter((college) => college.name.toLowerCase().includes(filterValue));
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
}
