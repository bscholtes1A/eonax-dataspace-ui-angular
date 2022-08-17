import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from 'src/app/models/participant';
import { AuthService } from 'src/app/services/auth.service';
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
  participants: Participant[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loggedAs?: Participant = undefined;

  constructor(
    private authService: AuthService,
    private sessionManager: SessionManagerService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerParticipants();

    const result = this.sessionManager.getUser();
    if (result.succeeded()) {
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.router.navigate(['search']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    const participant = this.participants.find((p) => p.name === username);

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

  loginSuccessful(participant: Participant) {
    this.sessionManager.saveUser(participant);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.router.navigate(['search']);
  }

  registerParticipants() {
    this.httpService
      .getAllParticipants()
      .subscribe((response: Array<Participant>) => {
        this.participants = response;
      });
  }
}
