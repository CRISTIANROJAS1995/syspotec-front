import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { UserResponseSummaryModel } from 'app/core/models/user/user-response-summary-model';


@Injectable({
    providedIn: 'root'
})
export class GlobalRankingService {

    constructor(private _httpClient: HttpClient) {
    }

    getGlobalRanking(): Observable<UserResponseSummaryModel[]> {
        return this._httpClient.get<UserResponseSummaryModel[]>(`${environment.api}/Home/GetRanking`);
    }

}
