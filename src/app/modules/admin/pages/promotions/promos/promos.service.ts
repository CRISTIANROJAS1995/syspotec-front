import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';


@Injectable({
    providedIn: 'root'
})
export class MyPromotionService {

    constructor(private _httpClient: HttpClient) {
    }

    getMyHibeats(): Observable<addPromotion[]> {
        return this._httpClient.get<addPromotion[]>(`${environment.api}/Hibeat`);
    }

    getHibeatId(id: string): Observable<addPromotion> {
        return this._httpClient.get<addPromotion>(`${environment.api}/Promotion/${id}`);
    }

    createPromotion(promo: addPromotion): Observable<addPromotion> {
        return this._httpClient.post<addPromotion>(`${environment.api}/Promotion`, promo);
    }

    updatePromotion(promo: addPromotion): Observable<addPromotion> {
        return this._httpClient.put<addPromotion>(`${environment.api}/Promotion`, promo);
    }


    getMyPromotions(): Observable<addPromotion[]> {
        return this._httpClient.get<addPromotion[]>(`${environment.api}/Promotion/GetAll`);
    }

    removeHiBeat(promo: addPromotion): Observable<addPromotion> {
        return this._httpClient.delete<addPromotion>(`${environment.api}/Promotion`, { body: promo });
    }


}
