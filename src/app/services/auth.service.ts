import { Injectable } from '@angular/core';
import { Result } from '../models/result';

const PASSWORD = 'eonaxdemo'; // TODO: make this a secret

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(password: string): Result<void> {
    if (password !== PASSWORD) {
      return Result.failure('Wrong password');
    }
    return Result.success(undefined);
  }
}
