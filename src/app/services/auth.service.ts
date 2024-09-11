import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Constants } from "../utils/constants";
import { AuthRequest } from "../model/auth/auth-request";
import { AuthResponse } from "../model/auth/auth-response";
import { catchError, map, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { UserCreateRequest } from "../model/user/user-create-request";

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    public signIn(username: string, password: string):Observable<AuthResponse> {
        return this.http.post<AuthResponse>(Constants.authRequest, new AuthRequest(username, password))
        .pipe(
            map((param) => {      
                this.setSession(param.value);
                return new AuthResponse(param.value, true)
            }),
            catchError(async (err) => {
                return new AuthResponse(err.error.error, false)
            })
        );
    }

    public register(user: UserCreateRequest):Observable<AuthResponse> {
        return this.http.post<AuthResponse>(Constants.registerRequest, user)
        .pipe(
            map((param) => {     
                this.setSession(param.value);
                return new AuthResponse(param.value, true)
            }),
            catchError(async (err) => {
                return new AuthResponse(err.error.error, false)
            })
        );
    }

    public logoutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    public isTokenExpired() {
        const expiration = localStorage.getItem('expires_at');
        if(expiration) {
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
