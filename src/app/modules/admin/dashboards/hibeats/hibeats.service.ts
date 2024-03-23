import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { HiBeatDto } from 'app/core/models/hi-beat.dto';
import { ReactionDto } from 'app/core/models/reaction.dto';
import { UpdateHibeatResponseModel } from 'app/core/models/hibeat/update-responsive-model';

@Injectable({
    providedIn: 'root'
})
export class DashboardHibeatsService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getMyHibeats(): Observable<HiBeatDto[]> {
        return this._httpClient.get<HiBeatDto[]>(`${environment.api}/hibeat`);
    }

    getHiBeat(hiBeatId: string): Observable<HiBeatDto> {
        return this._httpClient.get<HiBeatDto>(`${environment.api}/hibeat/${hiBeatId}`);
    }

    getReactions(hibeatId: string): Observable<ReactionDto[]> {
        return this._httpClient.get<ReactionDto[]>(`${environment.api}/reaction/${hibeatId}`);
    }

    updateHiBeat(hibeat: UpdateHibeatResponseModel): Observable<UpdateHibeatResponseModel> {
        return this._httpClient.put<UpdateHibeatResponseModel>(`${environment.api}/Hibeat`, hibeat);
    }



}
