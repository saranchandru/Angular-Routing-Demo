import { Injectable } from '@angular/core';
import { InsuranceClaims } from '../claims.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimDetailService {
  private claimInfo!: InsuranceClaims;
  constructor() { }

  public setClaimData = (claim: InsuranceClaims) => {
    this.claimInfo = claim;
  }

  public getClaimData = () => {
    return this.claimInfo;
  }
}
