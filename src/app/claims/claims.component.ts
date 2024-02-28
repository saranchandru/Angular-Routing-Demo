import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UserRole } from '../utilities/user/user-role.enum';
import { ClaimDetailService } from './claim-detail/claim-detail.service';
import { InsuranceClaims } from './claims.model';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, NgIf, NgFor],
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  userRole: string = '';
  managerRole: string = UserRole.MANAGER;
  adminRole: string = UserRole.ADMIN;
  claims: InsuranceClaims[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private claimDetailService: ClaimDetailService,
  ) { }
  ngOnInit(): void {
    this.loginService.currentUser.subscribe({
      next: (user) => {
        if (user.id > 0) {
          this.userRole = user.role;
        }
      }
    });

    this.claims = [
      {
        claimId: 123456,
        name: 'John Doe',
        claimDate: new Date(2023, 0, 1),
        claimType: 'Auto',
        status: 'Pending',
        amount: 100000
      },
      {
        claimId: 789012,
        name: 'Jane Smith',
        claimDate: new Date(2024, 1, 15),
        claimType: 'Property Damage',
        status: 'Approved',
        amount: 5000
      },
    ];
  }

  public onClaimView(claim: InsuranceClaims) {
    this.claimDetailService.setClaimData(claim);
    this.router.navigateByUrl('/claims/detail')
  }
}
