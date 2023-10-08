import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private readonly router : Router
  ){}

  public getBack(){
    this.router.navigateByUrl('/settings');
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

    console.log(value?.getBoundingClientRect());

    list?.scrollTo(
      {
        top: value?.getBoundingClientRect().height,
        left: 0,
        behavior: "smooth"
      }
    )
  }

  public isButtonDisabled(index: number): boolean {
    if(index === 3 || index === this.List.length) return true
    return false
  }

  ngOnInit(): void {

  }
}
