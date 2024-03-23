import { Route } from '@angular/router';
import { GlobalRankingComponent } from './global-ranking.component';

export const GlobalRankingRoutes: Route[] = [
    {
        path     : '',
        component: GlobalRankingComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
