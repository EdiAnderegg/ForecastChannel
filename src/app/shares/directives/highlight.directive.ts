import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[Highlight]',
})
export class HighlightDirectiv {
  @HostBinding('style.color') fontColor: string;
  constructor() {
    this.fontColor = '#ffcc0f';
  }
}
