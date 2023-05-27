import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper = new JwtHelperService();

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
  
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
}