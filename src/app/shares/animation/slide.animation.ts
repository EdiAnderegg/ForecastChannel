import { trigger, animate, transition, style, group, query } from '@angular/animations'


export const slideUpAnimation = trigger('slideUpAnimation',[
  //transition between any two states
  transition('* <=> *',[
    //Events to apply
    //Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({position: 'fixed',width: '100%'}),{optional: true}),
    //group block executes in parallel
    group([
      query(':enter',[
        style({transform: 'translateY(100%)'}),
        animate('0.6s cubic-bezier(0.1, 0.4, 0, 1)', style({transform: 'translateY(0%)'}))
      ], {optional: true}),
      query(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.6s cubic-bezier(0.2, 1, 1, 1)', style({transform: 'translateY(-100%)'}))
      ],{optional: true})
    ])
  ])
]);

export const slideDownAnimation = trigger('slideDownAnimation',[
  //transition between any two states
  transition('* <=> *',[
    //Events to apply
    //Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({position: 'fixed',width: '100%'}),{optional: true}),
    //group block executes in parallel
    group([
      query(':enter',[
        style({transform: 'translateY(0%)'}),
        animate('0.6s cubic-bezier(0.1, 0.4, 0, 1)', style({transform: 'translateY(100%)'}))
      ], {optional: true}),
      query(':leave',[
        style({transform: 'translateY(-100%)'}),
        animate('0.6s cubic-bezier(0.2, 1, 1, 1)', style({transform: 'translateY(00%)'}))
      ],{optional: true})
    ])
  ])
]);
