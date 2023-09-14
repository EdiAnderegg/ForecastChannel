import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/shares/animation/slide.animation';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slider]
})
export class MainComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  private Current : Current | undefined;
  public Weather : any | undefined;
  public actualSite: string[] = ['UV-Index','Current','Today','Tomorrow','5-Day Forecast']
  public urlTitle : string | undefined = '';
  public currentIndex : number = 1;


  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router)
              {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }            
  
  public btnstart(){
    this.router.navigateByUrl('/start');
  }
  public btnSlide(increment: number){
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 1 && newIndex < this.actualSite.length) {
      this.currentIndex = newIndex;
      this.router.navigateByUrl(`main/${this.actualSite[newIndex]}`);
    }
  }


  isButtonDisabled(index: number) {
    return index === 1 || index === this.actualSite.length - 1;
  }

  ngOnInit(): void {
    this.urlTitle = this.router.url.split('/').pop();
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.weatherService.setWeather(pos.coords.latitude,pos.coords.longitude,'metric','');
        this.weatherService.getCurrentWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Current = {...data};
          this.Current.icon = this.iconService.getIcon(this.Current.description);
          this.Weather = this.Current
          this.sessionDataService.outputWeather(this.Current);
        })
      })
    }
  }

}
