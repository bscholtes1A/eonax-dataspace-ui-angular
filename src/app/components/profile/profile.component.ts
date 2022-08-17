import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private selfDescriptionSub: Subscription | undefined;

  constructor(
    router: Router,
    sessionManager: SessionManagerService,
    private httpService: HttpService
  ) {
    super(router, sessionManager);
  }

  protected init(): void {
    this.fetchSelfDescription();
  }

  ngOnDestroy(): void {
    if (this.selfDescriptionSub) {
      this.selfDescriptionSub.unsubscribe();
    }
  }

  private fetchSelfDescription(): void {
    this.selfDescriptionSub = this.httpService
      .getSelfDescription(this.participant!.url)
      .subscribe((response: any) => {
        this.selfDescription = response;
      });
  }
}
