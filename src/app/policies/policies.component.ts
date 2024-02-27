import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InsurancePolicy } from './policies.model';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent implements OnInit {
  policies: InsurancePolicy[] = [];

  ngOnInit() {
    this.policies = [
      {
        policyId: 123456,
        policyholderName: 'John Doe',
        policyType: 'Auto',
        coverageAmount: 100000,
        startDate: new Date(2023, 0, 1),
        endDate: new Date(2024, 11, 31),
      },
    ];
  }
}
