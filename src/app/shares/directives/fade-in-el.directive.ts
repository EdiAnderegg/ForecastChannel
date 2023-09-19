import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { fadeInAnimation } from '../animation/fade-in.animation';

@Directive({
  selector: '[FadeInEl]'
})
export class FadeInElDirective implements OnInit {

  @Input() innerValue!: string;
  private player!: AnimationPlayer;

  constructor(private readonly el: ElementRef,
              private readonly animationBuilder: AnimationBuilder) { }

  ngOnInit() {
    this.player = this.animationBuilder.build(fadeInAnimation);
    const element = this.el.nativeElement;
    element.nativeElement.innerHTML = `<h1>${this.innerValue}</h1>`;

    this.player.onStart(() => {
      element.style.display = 'block';
    });
    this.player.play();
  }
}
