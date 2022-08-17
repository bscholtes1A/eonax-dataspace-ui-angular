import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from 'src/app/models/participant';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-authenticated-component',
  template: '',
})
export abstract class AbstractAuthenticatedComponent implements OnInit {
  protected participant?: Participant;
  protected isLoggedin = false;

  protected constructor(
    protected r: Router,
    protected s: SessionManagerService
  ) {}

  ngOnInit(): void {
    const result = this.s.getUser();
    if (result.failed()) {
      console.warn('Not authenticated');
      this.r.navigate(['login']);
    } else {
      this.participant = result.getEntity();
      this.isLoggedin = true;
    }
    this.init();
  }

  protected abstract init(): void;
}
