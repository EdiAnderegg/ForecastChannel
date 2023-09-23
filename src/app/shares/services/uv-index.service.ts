import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UV } from '../interfaces/uv.interface';


@Injectable({
  providedIn: 'root'
})
export class UvIndexService {


  private api : string = 'openuv-burlmw0un2i-io';
  private url : string = 'https://api.openuv.io/api/v1/uv';
  private settings! : User;
  private headers = new HttpHeaders({
    'x-access-token':this.api,
    'Content-Type':'application/json'
  });


  private requestOptions = {headers : this.headers};

  constructor(private readonly http: HttpClient) {}

  public setUV(lat : number, lon : number){
    this.settings = {lat : lat, lon : lon, units : '', location : ''};
  }

  private buildUrl(): string{
    return`${this.url}?lat=${this.settings.lat}&lng=${this.settings.lon}`;
  }

  public getUV$(): Observable<any>{

    return this.http.get<any>(this.buildUrl(),this.requestOptions)
    .pipe(map((res) =>{
      const UV: UV = {
        uv : res.result.uv,
        time : new Date().getTime()
    }
    return UV;
  }));
  };
};
