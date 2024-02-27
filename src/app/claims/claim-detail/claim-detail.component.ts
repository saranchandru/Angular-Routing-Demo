import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { UserRole } from '../../utilities/user/user-role.enum';
import { InsuranceClaims } from '../claims.model';
import { ClaimDetailService } from './claim-detail.service';

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './claim-detail.component.html',
  styleUrl: './claim-detail.component.scss'
})
export class ClaimDetailComponent implements OnInit {
  public claimInfo!: InsuranceClaims;
  claimForm: FormGroup = this.fb.group({
    claimId: [0, Validators.required],
    name: ['', Validators.required],
    claimDate: ['', Validators.required],
    claimType: ['', Validators.required],
    status: ['', Validators.required],
    amount: [0, Validators.required]
  });

  constructor(
    private claimDetailService: ClaimDetailService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.claimInfo = this.claimDetailService.getClaimData();
    if (this.claimInfo) {
      this.claimForm.setValue({
        ...this.claimInfo
      })
    } else {
      this.claimForm.reset();
    }

    this.loginService.currentUser.subscribe({
      next: (user) => {
        if (user.id > 0) {
          if (user.role !== UserRole.ADMIN) {
            this.claimForm.disable();
          }
        }
      }
    })
  }

  onSubmit() {
    if (this.claimForm.valid) {
      const claimData = this.claimForm.value;
      console.log(claimData);
      this.claimForm.reset(); // Reset the form after submission
    }
  }
}
