import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailHibeatService } from './detail.service';

@Injectable({
    providedIn: 'root'
})
export class DetailHiBeatResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _detailHibeatService: DetailHibeatService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._detailHibeatService.getActivities();
    }
}
