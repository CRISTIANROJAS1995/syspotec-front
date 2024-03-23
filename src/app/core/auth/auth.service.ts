import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    catchError,
    firstValueFrom,
    Observable,
    of,
    switchMap,
    throwError,
} from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { ResponseLoginModel } from '../models/user/response-login-model';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set pkUser(pkUser: string) {
        localStorage.setItem('pkUser', pkUser);
    }

    get pkUser(): string {
        return localStorage.getItem('pkUser') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {

        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(`${environment.api}/User/auth`, credentials)
            .pipe(
                switchMap((response: ResponseLoginModel) => {
                    if (response.result) {
                        // Store the access token in the local storage
                        this.accessToken = response.data.token;

                        // Set the authenticated flag to true
                        this._authenticated = true;

                        // Store the user on the user service
                        //this._userService.user = response.data.userData;
                    }

                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();

        // Set the authenticated flag to true
        this._authenticated = true;
        return of(true);
    }
}
