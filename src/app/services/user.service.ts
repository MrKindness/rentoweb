import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { User, UserRequest } from '../model/user';
import { SimpleResponse } from '../model/simple-response';

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);

    public getCurrentUser(): Observable<SimpleResponse> {
        return this.http.get<User>(Constants.userRoot).pipe(
            map((user) => {
                return new SimpleResponse(true, '', user);
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public getAllUsers(): Observable<SimpleResponse> {
        return this.http.get<User[]>(Constants.userAdminRequest).pipe(
            map((body) => {
                return new SimpleResponse(true, '', body);
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public updateUser(user: UserRequest): Observable<SimpleResponse> {
        return this.http.put<SimpleResponse>(Constants.updateUserRequest, user).pipe(
            map((user) => {
                return new SimpleResponse(true, '', user);
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public createUserByAdmin(user: UserRequest): Observable<SimpleResponse> {
        return this.http.post<SimpleResponse>(Constants.userAdminRequest, user).pipe(
            map((user) => {
                return new SimpleResponse(true, '', user);
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public deleteUser(username: String): Observable<SimpleResponse> {
        return this.http.delete<SimpleResponse>(`${Constants.userRoot}/${username}`).pipe(
            map((body) => {
                return new SimpleResponse(true, '');
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }
}
