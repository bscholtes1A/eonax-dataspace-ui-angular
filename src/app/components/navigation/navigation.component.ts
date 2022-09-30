import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public isLoggedin = false;
  public participantName = '';
  private participantSub?: Subscription;

  constructor(
    private router: Router,
    private sessionManager: SessionManagerService
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.participantSub = this.sessionManager
      .loginStream()
      .subscribe((logged) => {
        this.isLoggedin = logged;
        if (logged) {
          this.participantName = this.sessionManager
            .getUser()
            .getEntity()
            .getName();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.participantSub) {
      this.participantSub.unsubscribe();
    }
  }

  onSubmit(form: Form): void {}

  logout(): void {
    this.sessionManager.signOut();
    this.toLoginPage();
  }

  toProfilePage(): void {
    this.router.navigate(['profile']);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  fetchUser() {
    const user = this.sessionManager.getUser();
    if (user.succeeded()) {
      this.isLoggedin = true;
      this.participantName = user.getEntity().getName();
    }
  }
}
