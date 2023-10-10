import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public List : string[] = ['Herisau','Sankt Gallen','Wil','Weinfelden','Rapperswil','Winterthur','Romanshorn'];
  public currentIndex : number = 4;
  private height : number = 0;
  private User : User | undefined;


  constructor(
    private readonly router : Router,
    private readonly sessionDataService : SessionDataService
  ){}

  public getBack(){
    this.router.navigateByUrl('/settings');
  }

  public btnLocation(location : string):void{
    this.sessionDataService.outputUser({
      lat : this.User?.lat!,
      lon : this.User?.lon!,
      tempUnit : this.User?.tempUnit!,
      windSpeed : this.User?.windSpeed!,
      location : location
    });
  }

  public btnSlide(increment: number, idparentElement : string, idChildElement : string){
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 4 && newIndex < this.List.length) {
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
    if(index === 3 || index === this.List.length) return true
    return false
  }

  ngOnInit(): void {
    this.sessionDataService.getUser$().pipe(take(1))
    .subscribe((data)=>{
      this.User = data;
    });
  }
}
