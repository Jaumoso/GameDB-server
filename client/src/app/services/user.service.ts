import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get<{userData: User}>(baseURL + 'user/' + userId)
      .subscribe(user => {
        resolve(user.userData);
      }, err => {
        reject(err);
      });
    });
  }

  createUser(user: User): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<{newUser: User}>(baseURL + 'user/new', user, httpOptions)
      .subscribe(user => {
        resolve(user.newUser);
      }, err => {
        reject(err);
      });
    });
  }

  updateUser(userId: string, user: User): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.put<{existingUser: User}>(baseURL + 'user/update/' + userId, user, httpOptions)
      .subscribe(user => {
        resolve(user.existingUser);
      }, err => {
        reject(err);
      });
    });
  }

  updateUserContent(userId: string, user: User): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const { _id, password, username, joined, lastSeen,... rest } = user;
    console.log(rest);
    return new Promise((resolve, reject) => {
      this.http.put<{updatedUser: User}>(baseURL + 'user/update/content/' + userId, rest, httpOptions)
      .subscribe(user => {
        resolve(user.updatedUser);
      }, err => {
        reject(err);
      });
    });
  }

  async deleteUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.delete<{userData: User}>(baseURL + 'user/delete/' + userId)
      .subscribe(user => {
        resolve(user.userData);
      }, err => {
        reject(err);
      });
    });
  }

  checkExistingUser(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<{userData: User[]}>(baseURL + 'user/checkexistinguser/' + username)
      .subscribe(user => {
        if(user){
          resolve(true);
        }
        else{
           resolve(false);
        }
      }, err => {
        resolve(false);
      });
    });
  }
}
