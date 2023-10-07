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

  constructor(
    private readonly router : Router
  ){}

  public getBack(){
    this.router.navigateByUrl('/settings');
  }

  ngOnInit(): void {

  }
}
