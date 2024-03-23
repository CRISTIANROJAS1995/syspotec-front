import { Route } from '@angular/router';
import { fileListHBComponent } from './file-listHB.component';


export const fileListHBRoutes: Route[] = [
    {
        path     : '',
        component: fileListHBComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
