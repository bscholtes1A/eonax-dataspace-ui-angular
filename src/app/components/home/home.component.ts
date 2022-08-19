import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { ContractOffer } from 'src/app/models/contract-offer';
import { Offer } from 'src/app/models/offer';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AbstractAuthenticatedComponent } from '../abstracts/abstract-authenticated.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends AbstractAuthenticatedComponent
  implements OnDestroy
{
  public contractOffers: Array<ContractOffer> = [];
  private offerSub?: Subscription;
  private contractSub?: Subscription;

  constructor(
    private httpService: HttpService,
    private utils: UtilsService,
    sessionManager: SessionManagerService,
    private router: Router
  ) {
    super(router, sessionManager);
  }

  init(): void {
    this.fetchContractOffers();
  }

  ngOnDestroy(): void {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
    if (this.contractOffers) {
      this.contractSub?.unsubscribe();
    }
  }

  openOfferView(id: string): void {
    this.router.navigate(['offer', id]);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  onSubmit(form: NgForm) {}

  fetchContractOffers() {
    this.offerSub = this.httpService
      .getAllOffers(this.participant!.url)
      .subscribe((offersResponse: Array<Offer>) => {
        offersResponse.forEach((offer) => this.fetchContractAndRegister(offer));
      });
  }

  fetchContractAndRegister(offer: Offer): void {
    if (offer.asset.keywords.includes('events')) {
      this.contractOffers.push({
        offer: offer,
        contract: Contract.alwaysValid(),
      });
    } else {
      const assetId = this.utils.extractAssetIdFromOfferId(offer.id);
      this.contractSub = this.httpService
        .getContract(this.participant!.url, assetId)
        .subscribe({
          next: (contractResponse: Contract) => {
            this.contractOffers.push({
              offer: offer,
              contract: contractResponse,
            });
          },
          error: (e) => {
            this.contractOffers.push({
              offer: offer,
            });
          },
        });
    }
  }

  getOfferHoverText(contractOffer: ContractOffer): string {
    return this.utils.getContractOfferDisponibility(contractOffer);
  }
}
