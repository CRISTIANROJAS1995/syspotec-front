import { Route } from '@angular/router';
import { TopListComponent } from './top-list.component';

export const TopListRoutes: Route[] = [
    {
        path     : '',
        component: TopListComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
