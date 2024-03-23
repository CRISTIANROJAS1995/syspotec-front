import { Route } from '@angular/router';
import { DetailHibeatComponent } from './detail.component';
import { DetailHiBeatResolver } from './detail.resolvers';

export const detailHiBeatRoutes: Route[] = [
    {
        path     : ':id',
        component: DetailHibeatComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
