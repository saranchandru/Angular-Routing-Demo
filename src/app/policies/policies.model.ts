export interface InsurancePolicy {
  policyId: number;
  policyholderName: string;
  policyType: string;
  coverageAmount: number;
  startDate: Date;
  endDate: Date;
}