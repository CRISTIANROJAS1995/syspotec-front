import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserModel } from '../models/user.dto';
import { environment } from 'environments/environment';
import { UserModelCls } from '../models/user-model';
import { UserResponseDtoModel } from '../models/user/user-response-dto-model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: ReplaySubject<UserResponseDtoModel> = new ReplaySubject<UserResponseDtoModel>(1);

    constructor(private _httpClient: HttpClient) {
    }

    get user$(): Observable<UserResponseDtoModel> {
        return this._user.asObservable();
    }

    getMyUser(): Observable<UserResponseDtoModel> {
        return this._httpClient.get<UserResponseDtoModel>(`${environment.api}/User`).pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

}
