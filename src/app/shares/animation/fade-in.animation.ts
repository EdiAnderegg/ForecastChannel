import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, display: 'fixed' }),
    animate('600ms ease-in-out', style({ opacity: 1 })),
  ]),
]);
