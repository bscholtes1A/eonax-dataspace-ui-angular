import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { AbstractAuthenticatedComponent } from '../abstracts/abstract-authenticated.component';

const POPULARITY = 80;

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent
  extends AbstractAuthenticatedComponent
  implements OnDestroy
{
  popularity = 0;
  offerId?: string;
  offer: Offer | undefined;
  routeSub?: Subscription;
  offerSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    router: Router,
    sessionManager: SessionManagerService
  ) {
    super(router, sessionManager);
  }

  init(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.offerId = params['id'];
      this.getOfferDetails(this.offerId!);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }

  getOfferDetails(id: string): void {
    this.offerSub = this.httpService
      .getAllOffers(this.participant!.url)
      .subscribe((offersList: Array<Offer>) => {
        const offer = offersList.find((o) => this.compareOffersById(o.id, id));
        if (offer === undefined) {
          throw 'Cannot find Offer with id: ' + id;
        }
        this.offer = offer;

        setTimeout(() => {
          this.popularity = POPULARITY;
        }, 1000);
      });
  }

  compareOffersById(offerId1: string, offerId2: string) {
    return this.extractAssetId(offerId1) === this.extractAssetId(offerId2);
  }

  extractAssetId(offerId: string): string {
    const elements = offerId.split(':');
    if (elements.length != 2) {
      throw 'Invalid offer id: ' + offerId;
    }
    return elements[0];
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 5) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
