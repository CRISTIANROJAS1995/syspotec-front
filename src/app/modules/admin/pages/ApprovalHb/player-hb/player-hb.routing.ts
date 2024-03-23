import { Route } from '@angular/router';
import { PlayerHbComponent } from './player-hb.component';



export const PlayerHbRoutes: Route[] = [
    {
        path     : '',
        component: PlayerHbComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
