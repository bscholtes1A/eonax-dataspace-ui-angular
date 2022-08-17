import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  public offers: Array<Offer> = [];
  private offerSub?: Subscription;

  constructor(
    private httpService: HttpService,
    sessionManager: SessionManagerService,
    private router: Router
  ) {
    super(router, sessionManager);
  }

  init(): void {
    this.fetchOffers();
  }

  ngOnDestroy(): void {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }

  openOfferDetails(id: string): void {
    this.router.navigate(['offer', id]);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  onSubmit(form: NgForm) {}

  fetchOffers() {
    this.offerSub = this.httpService
      .getAllOffers(this.participant!.url)
      .subscribe((offerList: Array<Offer>) => {
        this.offers = offerList;
      });
  }
}
