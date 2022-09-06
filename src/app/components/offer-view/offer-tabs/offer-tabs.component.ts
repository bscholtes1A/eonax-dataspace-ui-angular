import { Component, Input, OnInit } from '@angular/core';
import { ContractOffer } from 'src/app/models/contract-offer';

@Component({
  selector: 'app-offer-tabs',
  templateUrl: './offer-tabs.component.html',
  styleUrls: ['./offer-tabs.component.scss'],
})
export class OfferTabsComponent implements OnInit {
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
