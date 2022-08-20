import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { ContractAgreementDto } from 'src/app/models/contract-agreement-dto';
import { ContractOffer } from 'src/app/models/contract-offer';
import { NegotiationRequestDto } from 'src/app/models/negotiation-request-dto';
import { Offer } from 'src/app/models/offer';
import { TransferRequestDto } from 'src/app/models/transfer-request-dto';
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
  contractOffer: ContractOffer | undefined;
  routeSub?: Subscription;
  offerSub?: Subscription;
  contractSub?: Subscription;
  negotiationSub?: Subscription;
  agreementSub?: Subscription;
  transferRequestSub?: Subscription;
  accessRequestOngoing: boolean = false;
  isAccessRequestSuccess = false;
  isAccessRequestFailed = false;
  accessRequestError: string = '';
  accessGrantedMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    sessionManager: SessionManagerService
  ) {
    super(router, sessionManager);
  }

  init(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.fetchContractOffer(params['id']);
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
    if (this.transferRequestSub) {
      this.transferRequestSub.unsubscribe();
    }
    if (this.contractSub) {
      this.contractSub.unsubscribe();
    }
    if (this.agreementSub) {
      this.agreementSub.unsubscribe();
    }
  }

  fetchContractOffer(assetId: string): void {
    this.offerSub = this.httpService
      .getOfferByAssetId(this.participant!.url, assetId)
      .subscribe((offerResponse: Offer) => {
        this.contractOffer = ContractOffer.noContract(offerResponse);
        this.fetchContract(this.contractOffer);

        setTimeout(() => {
          this.popularity = POPULARITY;
        }, 1000);
      });
  }

  fetchContract(co: ContractOffer): void {
    if (co.offer.isEvent()) {
      this.contractOffer?.updateContract(Contract.unlimited());
    } else {
      this.contractSub = this.httpService
        .getContract(this.participant!.url, co.offer.asset.id)
        .subscribe((contractResponse: Contract) =>
          co.updateContract(contractResponse)
        );
    }
  }

  requestAccess(): void {
    this.initiateAccessRequest();

    this.negotiationSub = this.httpService
      .startNegotiation(
        this.participant!.url,
        new NegotiationRequestDto(this.contractOffer!.offer)
      )
      .subscribe((negotiationId: string) => {
        this.sendTransferRequest(negotiationId);
      });
  }

  initiateAccessRequest(): void {
    this.accessRequestOngoing = true;

    this.accessRequestError = '';
    this.isAccessRequestFailed = false;
    this.accessGrantedMessage = '';
    this.isAccessRequestSuccess = false;
  }

  sendTransferRequest(negotiationId: string) {
    this.agreementSub = this.httpService
      .getAgreement(this.participant!.url, negotiationId)
      .subscribe((dto: ContractAgreementDto) => {
        this.transferRequestSub = this.httpService
          .sendTransferRequest(
            this.participant!.url,
            new TransferRequestDto(this.contractOffer!.offer.asset, dto.id)
          )
          .pipe(
            catchError((err) => {
              const errorMsg =
                'Failed to retrieve agreement for negotiation id: ' +
                negotiationId;
              console.log(errorMsg);
              this.markAcessRequestAsErrored(errorMsg);
              return throwError(() => new Error(err));
            })
          )
          .subscribe((transferProcessId: string) => {
            console.log('Transfer process started: ' + transferProcessId);
            this.markAcessRequestAsSuccess(
              'Transfer process id: ' + transferProcessId
            );
          });
      });
  }

  markAcessRequestAsSuccess(msg: string): void {
    this.accessGrantedMessage = msg;
    this.isAccessRequestSuccess = true;
    this.accessRequestOngoing = false;
  }

  markAcessRequestAsErrored(error: string): void {
    this.accessRequestError = error;
    this.isAccessRequestFailed = true;
    this.accessRequestOngoing = false;
  }

  getGaugeColor(value: number): string {
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
