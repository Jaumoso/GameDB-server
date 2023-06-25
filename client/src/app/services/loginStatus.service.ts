import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  private _loggedIn = false;
  private _loginEmitter = new EventEmitter<boolean>();

  get loggedIn() {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
    this._loginEmitter.emit(value);
  }

  get loginChanges() {
    return this._loginEmitter.asObservable();
  }
}