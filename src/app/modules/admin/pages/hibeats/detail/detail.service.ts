import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DetailHiBeat } from './detail.types';
import { ReactionDto } from 'app/core/models/reaction.dto';
import { environment } from 'environments/environment';
import { HiBeatDto } from 'app/core/models/hi-beat.dto';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';

@Injectable({
    providedIn: 'root'
})
export class DetailHibeatService
{
    // Private
    private _activities: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for activities
     */
    get activities(): Observable<any>
    {
        return this._activities.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get activities
     */
    getActivities(): Observable<any>
    {
        return this._httpClient.get<DetailHiBeat[]>('api/pages/activities').pipe(
            tap((response: DetailHiBeat[]) => {
                this._activities.next(response);
            })
        );
    }

    removeHiBeat(promo: addPromotion): Observable<addPromotion> {
        return this._httpClient.delete<addPromotion>(`${environment.api}/Promotion`, { body: promo });
    }
}
