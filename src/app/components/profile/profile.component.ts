import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/models/asset';
import { Policy } from 'src/app/models/policy';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { AbstractAuthenticatedComponent } from '../abstracts/abstract-authenticated.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent
  extends AbstractAuthenticatedComponent
  implements OnDestroy
{
  public selfDescription: any | undefined;
  public policyDefinitions: Array<Policy> = [];
  public assets: Array<Asset> = [];
  public contractDefinitions: Array<any> = [];

  private selfDescriptionSub: Subscription | undefined;
  private policyDefinitionsSub: Subscription | undefined;
  private assetsSub: Subscription | undefined;
  private contractDefinitionsSub: Subscription | undefined;

  constructor(
    router: Router,
    sessionManager: SessionManagerService,
    private httpService: HttpService
  ) {
    super(router, sessionManager);
  }

  protected init(): void {
    this.fetchSelfDescription();
    this.fetchPolicyDefinitions();
    this.fetchAssets();
    this.fetchContractDefinitions();
  }

  ngOnDestroy(): void {
    if (this.selfDescriptionSub) {
      this.selfDescriptionSub.unsubscribe();
    }
    if (this.policyDefinitionsSub) {
      this.policyDefinitionsSub.unsubscribe();
    }
    if (this.assetsSub) {
      this.assetsSub.unsubscribe();
    }
    if (this.contractDefinitionsSub) {
      this.contractDefinitionsSub.unsubscribe();
    }
  }

  private fetchSelfDescription(): void {
    this.selfDescriptionSub = this.httpService
      .getSelfDescription(this.participant!.url)
      .subscribe((selfDescriptionResponse: any) => {
        this.selfDescription = selfDescriptionResponse;
      });
  }

  private fetchPolicyDefinitions(): void {
    this.policyDefinitionsSub = this.httpService
      .getAllPolicyDefinitions(this.participant!.url)
      .subscribe((policyDefinitionsResponse: Array<Policy>) => {
        this.policyDefinitions = policyDefinitionsResponse;
      });
  }

  private fetchAssets(): void {
    this.assetsSub = this.httpService
      .getAllAssets(this.participant!.url)
      .subscribe((assetsResponse: Array<Asset>) => {
        this.assets = assetsResponse;
      });
  }

  private fetchContractDefinitions(): void {
    this.contractDefinitionsSub = this.httpService
      .getAllContractDefinitions(this.participant!.url)
      .subscribe((contractDefinitionsResponse: Array<any>) => {
        this.contractDefinitions = contractDefinitionsResponse;
      });
  }
}
