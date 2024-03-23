import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { UserResponseSummaryModel } from 'app/core/models/user/user-response-summary-model';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';


@Injectable({
    providedIn: 'root'
})
export class TopListService {

    constructor(private _httpClient: HttpClient) {
    }

    getTopArtist(): Observable<UserResponseSummaryModel[]> {
        return this._httpClient.get<UserResponseSummaryModel[]>(`${environment.api}/Home/GetTopArtistLastWeek`);
    }

    getTopHiBeats(): Observable<HibeatResponseModel[]> {
        return this._httpClient.get<HibeatResponseModel[]>(`${environment.api}/Home/GetTopHbLastWeek`);
    }

}
