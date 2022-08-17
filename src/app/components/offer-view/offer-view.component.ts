import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UtilsService } from 'src/app/services/utils.service';
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
  offer: Offer | undefined;
  routeSub?: Subscription;
  offerSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private utils: UtilsService,
    sessionManager: SessionManagerService
  ) {
    super(router, sessionManager);
  }

  init(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.getOfferDetails(params['id']);
      } else {
        this.router.navigate(['home']);
      }
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
      .getOfferByAssetId(
        this.participant!.url,
        this.utils.extractAssetIdFromOfferId(id)
      )
      .subscribe((offerResponse: Offer) => {
        this.offer = offerResponse;

        setTimeout(() => {
          this.popularity = POPULARITY;
        }, 1000);
      });
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
