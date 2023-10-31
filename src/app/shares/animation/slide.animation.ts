import {
  trigger,
  animate,
  transition,
  style,
  group,
  query,
} from '@angular/animations';

export const slider = trigger('slider', [
  transition(':increment', slideTo('top')),
  transition(':decrement', slideTo('bottom')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          [direction]: 0,
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '100%' })]),
    group([
      query(
        ':leave',
        [
          animate(
            '600ms cubic-bezier(0.2, 1, 1, 1)',
            style({ [direction]: '-100%' })
          ),
        ],
        optional
      ),
      query(':enter', [
        animate(
          '600ms cubic-bezier(0.1, 0.4, 0, 1)',
          style({ [direction]: '0%' })
        ),
      ]),
    ]),
  ];
}
