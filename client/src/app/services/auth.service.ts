import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    
    login(username: string, password: string): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json'
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post<any>(baseURL + 'auth/login', { username, password }, httpOptions)
            .subscribe(token => {
            resolve(token.access_token);
            }, err => {
            reject(err);
            });
        });
    }
    
    setSession(token: string) {
        localStorage.setItem('GameDB_token', token);
    }
    
    closeSession(): void {
        localStorage.removeItem('GameDB_token');
    }
}