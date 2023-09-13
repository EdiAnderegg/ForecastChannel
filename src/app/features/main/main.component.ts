import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slideUpAnimation, slideDownAnimation} from 'src/app/shares/animation/slide.animation';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slideUpAnimation,slideDownAnimation]
})
export class MainComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  private Current : Current | undefined;
  public Weather : any | undefined;
  public actualSite: string[] = ['UV-Index','current','today','tomorrow','5-Day Forecast']
  public currentIndex : number = 1;
  public triggerUp: boolean = true;

  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router)
              {}

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
