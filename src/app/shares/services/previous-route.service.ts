import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private previousUrl: string | undefined;


  constructor(private readonly router : Router) {}

  public setLastUrl(){
    this.previousUrl = this.router.url.split('/').pop();
  }

  public getPreviousUrl(): string {
    if(this.previousUrl === undefined) return '/main/Current'
    return `/main/${this.previousUrl}`;
  }
}
