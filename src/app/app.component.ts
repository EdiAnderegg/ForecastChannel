import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public firstLoad: boolean = true;

  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalService.show(OptionsComponent);
  }
}
