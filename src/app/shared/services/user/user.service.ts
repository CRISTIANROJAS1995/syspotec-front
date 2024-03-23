import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/core/models/user.dto';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.api;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentUser: UserModel;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<UserModel> {
    if (!this.currentUser) {
      return this.getMyUser();
    }
    return of(this.currentUser);
  }

  getMyUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/user`).pipe(
      map((user: UserModel) => {
        this.currentUser = user;
        return user;
      }),
    );
  }

  updateMyUser(user: UserModel): Observable<UserModel> {
    user.timestampUpdated = Date.now();
    user.version = user.version + 1;
    user.coins = user.coins + 1000;
    user.totalCoins = user.totalCoins + 1000;
    return this.http.put<UserModel>(`${this.url}/user`, user);
  }
}
