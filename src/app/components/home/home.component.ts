import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { ContractOffer } from 'src/app/models/contract-offer';
import { Offer } from 'src/app/models/offer';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
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

  openOfferDetails(id: string): void {
    this.router.navigate(['offer', id]);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  onSubmit(form: NgForm) {}

  fetchContractOffers() {
    this.offerSub = this.httpService
      .getAllOffers(this.participant!.url)
      .subscribe((offerResponse: Array<Offer>) => {
        this.contractOffers = offerResponse.map(
          (o) => new ContractOffer(o, this.fetchContract(o))
        );
      });
  }

  fetchContract(offer: Offer): Contract | undefined {
    if (offer.asset.keywords.includes('events')) {
      return Contract.alwaysValid();
    } else {
      //TODO fetch contracts here
      return undefined;
    }
  }

  getOfferBackgroundColor(contractOffer: ContractOffer): string {
    if (contractOffer.hasContract() && contractOffer.contract!.isValid()) {
      return 'rgba(75, 52, 168, 0.528)';
    }
    return '#202020';
  }

  getOfferHoverText(contractOffer: ContractOffer): string {
    return 'hello world!';
  }
}
