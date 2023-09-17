
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Today } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  public Today$!: Observable<Today | undefined>;

  constructor(private readonly sessionDataService: SessionDataService) { }


  ngOnInit(): void {
    this.Today$ = this.sessionDataService.getToday$();

  }

}
