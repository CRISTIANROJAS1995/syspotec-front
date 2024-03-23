import { Route } from '@angular/router';
import { CopyrightHbComponent } from './copyright-hb.component';



export const CopyrightHbRoutes: Route[] = [
    {
        path     : '',
        component: CopyrightHbComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
