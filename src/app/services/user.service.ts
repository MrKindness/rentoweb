import { catchError, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Constants } from "../utils/constants";
import { UserResponse, User } from "../model/user";

@Injectable({providedIn: 'root'})
export class UserService {

    private http = inject(HttpClient);

    public getCurrentUser(): Observable<UserResponse> {
        return this.http.get<User>(Constants.currentUserRequest)
        .pipe(
            map((user) => {    
                return new UserResponse(true, user)
            }), 
            catchError(async (err) => {
                return new UserResponse(false, undefined);
            })
        );
    }
}