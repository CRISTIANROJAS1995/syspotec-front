import { Route } from '@angular/router';
import { PromosComponent } from './promos.component';

export const PromosRoutes: Route[] = [
    {
        path     : '',
        component: PromosComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
