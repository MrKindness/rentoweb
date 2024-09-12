import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { Constants } from "../utils/constants";
import { SimpleResponse } from "../model/simple-response";
import { TransportsResponse, Transport, TransportCreateRequest } from "../model/transport";

@Injectable({providedIn: 'root'})
export class TransportService {

    private http = inject(HttpClient);

    public getTransportsByOwner(): Observable<TransportsResponse> {
        return this.http.get<Transport[]>(Constants.transportsByOwnerRequest)
        .pipe(
            map((body:Transport[]) => {
                return new TransportsResponse(true, body);
            }), 
            catchError(async (err) => {
                return new TransportsResponse(false, []);
            })
        );
    }

    public createTransport(request: TransportCreateRequest): Observable<SimpleResponse> {
        return this.http.post<SimpleResponse>(Constants.createTransportRequest, request)
        .pipe(
            map((body) => {
                console.log(body);
                return new SimpleResponse(true, '');
            }), 
            catchError(async (err) => {
                console.log(err)
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }
}