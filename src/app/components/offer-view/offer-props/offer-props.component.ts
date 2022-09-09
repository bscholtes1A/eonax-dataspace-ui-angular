import { Component, Input, OnInit } from '@angular/core';
import { ContractOffer } from 'src/app/models/contract-offer';

@Component({
  selector: 'app-offer-props',
  templateUrl: './offer-props.component.html',
  styleUrls: ['./offer-props.component.scss'],
})
export class OfferPropsComponent implements OnInit {
  @Input()
  co!: ContractOffer;
  isDocumented = false;
  isRestricted = false;

  constructor() {}

  ngOnInit(): void {
    const permissions = this.co.offer.policy.permissions;
    this.isRestricted =
      permissions.length > 0 && permissions[0].constraints.length > 0;
    this.isDocumented = this.co.offer.asset.responseExample != undefined;
  }
}
