import { Component, OnInit} from '@angular/core';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

   public Current$!: Observable<Current | undefined>;
  constructor(
    private readonly sessionDataService: SessionDataService
  ) { }

  ngOnInit(): void {
    this.Current$ = this.sessionDataService.getWeather$();
  }

}
