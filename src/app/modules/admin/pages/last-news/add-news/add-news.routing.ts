import { Route } from '@angular/router';
import { AddNewsComponent } from './add-news.component';

export const addNewsRoutes: Route[] = [
    {
        path     : ':id',
        component: AddNewsComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
