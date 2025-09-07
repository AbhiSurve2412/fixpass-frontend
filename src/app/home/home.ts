import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatDividerModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  activeForm: 'login' | 'signup' = 'signup';

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      college: ['', Validators.required],
      university: ['', Validators.required],
      branch: ['', Validators.required],
      year: ['', [Validators.required,Validators.min(1), Validators.max(4)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
}
