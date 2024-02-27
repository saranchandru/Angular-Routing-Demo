import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginErrorModel } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup([]);
  public loginError: BehaviorSubject<LoginErrorModel[]> = new BehaviorSubject<LoginErrorModel[]>([]);

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginService.errorInformation.subscribe({
      next: (errorInfo) => {
        this.loginError.next(errorInfo);
      }
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.login(username, password)
        .subscribe({
          next: (user) => {
            if (user) {
              this.router.navigateByUrl('/claims');
            }
          },
          error: () => { }
        });
    } else {
      const errorInfo: LoginErrorModel = {
        errorCode: 'LOCAL_ERROR',
        errorMessage: 'Please fill the required fields',
        errorStatus: true,
      };
      this.loginService.errorInformation.next([errorInfo]);
    }
  }
}
