import { animation, trigger, transition, style, animate } from '@angular/animations';

export const showFieldAnimation = [
    trigger('showField', [
        transition(':enter', [
            style({ transform: 'translateY(-10%)', opacity: 0 }),
            animate('350ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', animate('350ms', style({ transform: 'translateY(-10%)', opacity: 0 })))
    ])
];