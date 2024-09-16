import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { SimpleResponse } from '../model/simple-response';
import { catchError, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthRequest } from '../model/auth';
import { UserRequest } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    public signIn(username: string, password: string): Observable<SimpleResponse> {
        return this.http.post<SimpleResponse>(Constants.authRequest, new AuthRequest(username, password)).pipe(
            map((response) => {
                this.setSession(response.value);
                return new SimpleResponse(true, response.value);
            }),
            catchError(async (err) => {
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public register(user: UserRequest): Observable<SimpleResponse> {
        return this.http.post<SimpleResponse>(Constants.registerRequest, user).pipe(
            map((response) => {
                this.setSession(response.value);
                return new SimpleResponse(true, response.value);
            }),
            catchError(async (err) => {
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public logoutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    public isTokenExpired() {
        const expiration = localStorage.getItem('expires_at');
        if (expiration) {
            return Date.now() / 1000 > Number(expiration);
        }
        return false;
    }

    private setSession(authResult: any) {
        let decodedHeader = jwtDecode(authResult);

        localStorage.setItem('token', authResult);
        localStorage.setItem('expires_at', decodedHeader.exp!.toString());
    }
}
