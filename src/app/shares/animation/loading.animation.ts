import {
  keyframes,
  style,
  animate,
  transition,
  trigger,
} from '@angular/animations';

export const fadeOutScreen = trigger('fadeOutScreen', [
  transition(':leave', [
    animate(
      '1000ms ease-out',
      keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ opacity: 0, offset: 1.0 }),
      ])
    ),
  ]),
]);
