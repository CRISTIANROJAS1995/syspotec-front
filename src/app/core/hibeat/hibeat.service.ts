import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { HibeatResponseModel, HibeatResponseModelInstrumentInterest, HibeatResponseModelMusicalInterest } from '../models/hibeat/hibeat-response-model';

@Injectable({
    providedIn: 'root'
})
export class HibeatService {

    private _hibeats: ReplaySubject<HibeatResponseModel[]> = new ReplaySubject<HibeatResponseModel[]>(1);
    private _myHibeats: ReplaySubject<HibeatResponseModel[]> = new ReplaySubject<HibeatResponseModel[]>(1);
    private _hibeatId: ReplaySubject<HibeatResponseModel> = new ReplaySubject<HibeatResponseModel>(1);
    private _hibeatInstrumentInterest: ReplaySubject<HibeatResponseModelInstrumentInterest[]> = new ReplaySubject<HibeatResponseModelInstrumentInterest[]>(1);
    private _hibeatMusicalInterest: ReplaySubject<HibeatResponseModelMusicalInterest[]> = new ReplaySubject<HibeatResponseModelMusicalInterest[]>(1);

    constructor(private _httpClient: HttpClient) {
    }

    get hibeats$(): Observable<HibeatResponseModel[]>
    {
        return this._hibeats.asObservable();
    }

    get myHibeats$(): Observable<HibeatResponseModel[]>
    {
        return this._myHibeats.asObservable();
    }

    get hibeatId$(): Observable<HibeatResponseModel>
    {
        return this._hibeatId.asObservable();
    }

    get hibeatInstrumentInterest$(): Observable<HibeatResponseModelInstrumentInterest[]>
    {
        return this._hibeatInstrumentInterest.asObservable();
    }

    get _hibeatMusicalInterest$(): Observable<HibeatResponseModelMusicalInterest[]>
    {
        return this._hibeatMusicalInterest.asObservable();
    }

    getAllHibeats(): Observable<HibeatResponseModel[]> {
        return this._httpClient.get<HibeatResponseModel[]>(`${environment.api}/Hibeat/GetAll?Page=1&RecordPerPage=50`).pipe(
            tap((hibeats: HibeatResponseModel[]) => {
                this._hibeats.next(hibeats);
            })
        );
    }
    
    getMyHibeats(): Observable<HibeatResponseModel[]> {
        return this._httpClient.get<HibeatResponseModel[]>(`${environment.api}/Hibeat`).pipe(
            tap((myHibeats) => {
                this._myHibeats.next(myHibeats);
            })
        );
    }

    getHibeatId(identifier: string): Observable<HibeatResponseModel> {
        return this._httpClient.get<HibeatResponseModel>(`${environment.api}/Hibeat/${identifier}`).pipe(
            tap((hibeatId) => {
                this._hibeatId.next(hibeatId);
            })
        );
    }

    getInstrumentsHibeats(): Observable<HibeatResponseModelInstrumentInterest[]> {
        return this._httpClient.get<HibeatResponseModelInstrumentInterest[]>(`${environment.api}/Generic/GetAllInstrumentInterest`).pipe(
            tap((hibeatInstrumentInterest) => {
                this._hibeatInstrumentInterest.next(hibeatInstrumentInterest);
            })
        );
    }

    getGenderHibeats(): Observable<HibeatResponseModelMusicalInterest[]> {
        return this._httpClient.get<HibeatResponseModelMusicalInterest[]>(`${environment.api}/Generic/GetAllMusicalInterest`).pipe(
            tap((hibeatMusicalInterest) => {
                this._hibeatMusicalInterest.next(hibeatMusicalInterest);
            })
        );
    }



}
