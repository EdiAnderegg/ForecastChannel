import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingService } from '../shares/services/loading.service';
import { FormControl } from '@angular/forms';
import { MotherService } from '../shares/services/main.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  public location = new FormControl<boolean>(true);
  public sound = new FormControl<boolean>(true);

  constructor(
    public modalRef: BsModalRef,
    private readonly loadingService: LoadingService,
    private readonly motherService: MotherService
  ) {}

  startApp() {
    this.loadingService.activateGPS = this.location.value!;
    this.loadingService.activateSound = this.sound.value!;
    this.motherService.initializeApp();
    this.modalRef.hide();
  }
}
