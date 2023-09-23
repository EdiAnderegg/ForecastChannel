import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UV } from 'src/app/shares/interfaces/uv.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.scss']
})
export class UvIndexComponent implements OnInit {

  public Uv$!: Observable<UV | undefined>;

  constructor(private readonly sessionDataService : SessionDataService){}

  ngOnInit(){
    this.Uv$ = this.sessionDataService.getUv$();
  }

}
