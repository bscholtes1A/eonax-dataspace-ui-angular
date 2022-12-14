import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DidDocument } from '../models/did-document';
import { Result } from '../models/result';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  private loginEvents = new Subject<boolean>();

  constructor() {}

  public signOut(): void {
    window.sessionStorage.clear();
    this.loginEvents.next(false);
  }

  public saveUser(user: DidDocument): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.loginEvents.next(true);
  }

  public getUser(): Result<DidDocument> {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return Result.success(new DidDocument(JSON.parse(user)));
    }
    return Result.failure('No user registered');
  }

  public loginStream(): Observable<any> {
    return this.loginEvents;
  }
}
