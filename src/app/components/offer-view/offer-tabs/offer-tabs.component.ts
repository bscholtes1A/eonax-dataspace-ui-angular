import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
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
    const permissions = this.offer.policy.permissions;
    this.isRestricted =
      permissions.length > 0 && permissions[0].constraints.length > 0;
    this.isDocumented = this.offer.asset.example != undefined;
  }
}
