

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { newsModel } from 'app/core/models/last-news/news.model';


@Injectable({
    providedIn: 'root'
})
export class LastNewsService {

    constructor(private _httpClient: HttpClient) {
    }


    createNews(promo: newsModel): Observable<newsModel> {
        return this._httpClient.post<newsModel>(`${environment.api}/Information`, promo);
    }

    updateNews(promo: newsModel): Observable<newsModel> {
        return this._httpClient.put<newsModel>(`${environment.api}/Information`, promo);
    }


    getAllLastNews(): Observable<newsModel[]> {
        return this._httpClient.get<newsModel[]>(`${environment.api}/Information/GetAll`);
    }

    removeHiBeat(news: newsModel): Observable<newsModel> {
        return this._httpClient.delete<newsModel>(`${environment.api}/Information`, { body: news });
    }


}
