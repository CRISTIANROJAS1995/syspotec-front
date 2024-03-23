import { Route } from '@angular/router';
import { DashboardHibeatsComponent } from './hibeats.component';
import { DashboardHibeatsResolver } from './hibeats.resolvers';

export const dashboardHibeatsRoutes: Route[] = [
    {
        path     : '',
        component: DashboardHibeatsComponent
        // resolve  : {
        //     data: DashboardHibeatsResolver
        // }
    }
];
