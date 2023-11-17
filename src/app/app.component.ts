import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OptionsComponent } from './options/options.component';
import { LoadingService } from './shares/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loadingApp$!: Observable<boolean>;

  constructor(
    private modalService: BsModalService,
    private readonly loadingService: LoadingService
  ) {}

  openModal() {
    this.modalService.show(OptionsComponent, { ignoreBackdropClick: true });
  }

  ngOnInit() {
    this.loadingApp$ = this.loadingService.getLoadingApp();
    this.openModal();
  }
}
