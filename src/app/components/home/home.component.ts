import { Component, OnDestroy } from '@angular/core';
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

  openOfferView(id: string): void {
    this.router.navigate(['offer', id]);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  fetchContractOffers() {
    this.offerSub = this.httpService
      .getAllOffers(this.didDocument!.getEndpoint())
      .subscribe((offersResponse: Array<Offer>) => {
        this.contractOffers = offersResponse.map((o) =>
          ContractOffer.noContract(o)
        );
        this.fetchContracts();
      });
  }

  fetchContracts(): void {
    this.contractOffers.forEach((co, index) => {
      this.contractSub = this.httpService
        .getContractsByAssetId(
          this.didDocument!.getEndpoint(),
          co.offer.asset.id
        )
        .subscribe((contractsResponse: Array<Contract>) => {
          if (contractsResponse.length > 0) {
            this.contractOffers[index] = co.updateContract(
              contractsResponse[0]
            );
          }
        });
    });
  }
}
