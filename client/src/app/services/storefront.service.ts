import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { Observable, map } from 'rxjs';
import { Storefront } from '../shared/storefront';

@Injectable({
    providedIn: 'root'
  })
  export class StorefrontService {
    constructor(private http: HttpClient) { }

    getStorefronts(): Observable<Storefront[]> {
        return this.http.get<{storefrontData: Storefront[]}>(baseURL + 'storefront')
        .pipe(map(storefronts => storefronts.storefrontData));
    }

    async getStorefront(storefrontId: string): Promise<Storefront> {
        return new Promise((resolve, reject) => {
            this.http.get<{storefrontData: Storefront}>(baseURL + 'storefront/' + storefrontId)
            .subscribe(storefront => {
            resolve(storefront.storefrontData);
            }, err => {
            reject(err);
            });
        });
    }


    async createStorefront(storefront: Storefront): Promise<Storefront> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        return new Promise((resolve, reject) => {
          this.http.post<{newStorefront: Storefront}>(baseURL + 'storefront/new/', storefront, httpOptions)
          .subscribe(storefront => {
            resolve(storefront.newStorefront);
          }, err => {
            reject(err);
          });
        });
    }

    updateStorefront(storefront: Storefront): Observable<Storefront> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        return this.http.put<{storefrontData: Storefront}>(baseURL + 'storefront/update/' + storefront._id, storefront, httpOptions)
        .pipe(map(storefront => storefront.storefrontData));
    }

    deleteStorefront(storefrontId: string): Observable<Storefront> {
        return this.http.delete<{storefrontData: Storefront}>(baseURL + 'storefront/delete/' + storefrontId)
        .pipe(map(storefront => storefront.storefrontData));
    }
  
    // async deleteStorefronts(userId: string): Promise<Storefront[]> {
    //     return new Promise((resolve, reject) => {
    //       this.http.delete<{storefrontData: Storefront[]}>(baseURL + 'storefront/deleteall/' + userId)
    //       .subscribe(storefronts => {
    //         resolve(storefronts.storefrontData);
    //       }, err => {
    //         reject(err);
    //       });
    //     });
    // }

}