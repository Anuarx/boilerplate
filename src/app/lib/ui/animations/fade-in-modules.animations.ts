import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
  ])
]);

export const fadeOutAnimation = trigger('fadeOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
  ])
]);

export const fadeInInitApplication = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('550ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('450ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
  ])
]);
