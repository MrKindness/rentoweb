import { catchError, map, Observable } from "rxjs";
import { User } from "../model/user/user";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Constants } from "../utils/constants";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class UserService {

    private http = inject(HttpClient);

    public getCurrentUser(): Observable<User | undefined> {
        return this.http.get<User>(Constants.currentUserRequest)
        .pipe(
            map((param) => {      
                return param
            }), 
            catchError(async (err) => {
                return undefined;
            })
        );
    }
}