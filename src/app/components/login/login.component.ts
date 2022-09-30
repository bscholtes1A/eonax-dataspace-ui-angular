import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DidDocument } from 'src/app/models/did-document';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  participants: DidDocument[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loggedAs?: DidDocument = undefined;

  constructor(
    private authService: AuthService,
    private sessionManager: SessionManagerService,
    private httpService: HttpService,
    private router: Router,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.fetchParticipants();

    const result = this.sessionManager.getUser();
    if (result.succeeded()) {
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.router.navigate(['search']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    const participant = this.participants.find((p) => p.getName() === username);

    if (participant !== undefined) {
      const auth = this.authService.login(password);
      if (auth.failed()) {
        this.loginFailed(auth.getError());
      } else {
        this.loginSuccessful(participant);
      }
    } else {
      this.loginFailed('No participant named ' + username);
    }
  }

  loginFailed(error: string) {
    this.isLoggedIn = false;
    this.isLoginFailed = true;
    this.errorMessage = error;
  }

  loginSuccessful(participant: DidDocument) {
    this.sessionManager.saveUser(participant);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.router.navigate(['search']);
  }

  fetchParticipants() {
    const registrationServiceUrl = this.config.get().registrationServiceUrl;
    //    console.log('registration service url: ' + registrationServiceUrl);

    this.httpService
      .getAllParticipants(registrationServiceUrl)
      .subscribe((response: Array<DidDocument>) => {
        this.participants = response;
      });
  }
}
