import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';
import { Location } from 'src/app/shares/interfaces/location.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { NearLocationService } from 'src/app/shares/services/near-location.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public List : Location[] | undefined;
  public currentIndex : number = 4;
  public display : boolean = true;
  public location : Location | undefined;
  private height : number = 0;
  private User : User | undefined;


  constructor(
    private readonly router : Router,
    private readonly sessionDataService : SessionDataService,
    private readonly  nearLocationService : NearLocationService
  ){}

  public getBack(){
    this.router.navigateByUrl('/settings');

  }

  public selectAgain(){
    this.currentIndex = 4;
    this.height = 0;
    this.display = true;
  }

  public selectLocation(location : Location):void{
    this.location = location;
    this.display = false;
  }

  public btnLocation():void{
    this.sessionDataService.outputUser({
      lat : this.location?.lat!,
      lon : this.location?.lon!,
      tempUnit : this.User?.tempUnit!,
      windSpeed : this.User?.windSpeed!,
      location : this.location?.city!
    });
    this.router.navigateByUrl('/settings');
  }

  public btnSlide(increment: number, idparentElement : string, idChildElement : string){
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 4 && newIndex < this.List!.length) {
      this.currentIndex = newIndex;
    }
    this.scroll(increment, idparentElement, idChildElement);
  }

  private scroll(increment : number, idparentElement : string, idChildElement : string):void{

    const list = document.getElementById(idparentElement);
    const value = document.getElementById(idChildElement);

    if(this.height < 0){
      this.height = 0;
      return;
    }

    if(this)
    if(increment === 1){
      list?.scrollTo(
        {
          top: this.height += value!.getBoundingClientRect().height,
          left: 0,
          behavior: "smooth"
        }
      )
    } else{
      list?.scrollTo(
        {
          top: this.height -= value!.getBoundingClientRect().height,
          left: 0,
          behavior: "smooth"
        }
      )
    }
  }

  public isButtonDisabled(index: number): boolean {
    if(this.List?.length === undefined)return false;
    if(index === 3 || index === this.List?.length) return true
    return false
  }

  private getLocations(lat : number, lng : number):void{
    if(NaN)return;
    this.nearLocationService.getNearestCities$(lat,lng)
    .pipe(take(1))
    .subscribe((data)=>{
      if(!data)return;
      this.List = data;
    });
  }

  ngOnInit(): void {
    this.sessionDataService.getUser$().pipe(take(1))
    .subscribe((data)=>{
      this.User = data;
      this.getLocations(this.User?.lat!, this.User?.lon!);
    });
  }
}
