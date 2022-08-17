import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-offer-tabs',
  templateUrl: './offer-tabs.component.html',
  styleUrls: ['./offer-tabs.component.scss'],
})
export class OfferTabsComponent implements OnInit {
  @Input()
  offer!: Offer;
  isDocumented = false;
  isRestricted = false;

  constructor() {}

  ngOnInit(): void {
    const permissions = this.offer.getPolicy().permissions;
    this.isRestricted =
      permissions.length > 0 && permissions[0].constraints.length > 0;
    this.isDocumented = this.offer.getAsset().responseExample != undefined;
  }
}
