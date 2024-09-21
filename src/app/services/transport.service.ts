import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Constants } from '../utils/constants';
import { SimpleResponse } from '../model/simple-response';
import { TransportsResponse, Transport, TransportCreateRequest, TransportUpdateRequest } from '../model/transport';

@Injectable({ providedIn: 'root' })
export class TransportService {
    private http = inject(HttpClient);

    public getTransportsByOwner(): Observable<TransportsResponse> {
        return this.http.get<Transport[]>(Constants.transportsByOwnerRequest).pipe(
            map((body: Transport[]) => {
                return new TransportsResponse(true, body);
            }),
            catchError(async (err) => {
                return new TransportsResponse(false, []);
            })
        );
    }

    public getAllTransports(): Observable<TransportsResponse> {
        return this.http.get<Transport[]>(Constants.transportsAdminRequest).pipe(
            map((body: Transport[]) => {
                return new TransportsResponse(true, body);
            }),
            catchError(async (err) => {
                console.log(err);
                return new TransportsResponse(false, []);
            })
        );
    }

    public getAvailableTransports(): Observable<TransportsResponse> {
        return this.http.get<Transport[]>(Constants.availableTransportsRequest).pipe(
            map((body: Transport[]) => {
                return new TransportsResponse(true, body);
            }),
            catchError(async (err) => {
                console.log(err);
                return new TransportsResponse(false, []);
            })
        );
    }

    public getRentedTransports(): Observable<TransportsResponse> {
        return this.http.get<Transport[]>(Constants.rentedTransportsRequest).pipe(
            map((body: Transport[]) => {
                return new TransportsResponse(true, body);
            }),
            catchError(async (err) => {
                return new TransportsResponse(false, []);
            })
        );
    }

    public rentTransport(transportId: String): Observable<SimpleResponse> {
        return this.http.put<SimpleResponse>(`${Constants.rentTransportRequest}/${transportId}`, null).pipe(
            map((body) => {
                return new SimpleResponse(true, '');
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public createTransport(request: TransportCreateRequest): Observable<SimpleResponse> {
        return this.http.post<SimpleResponse>(Constants.transportRequest, request).pipe(
            map((body) => {
                return new SimpleResponse(true, '');
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public updateTransport(request: TransportUpdateRequest): Observable<SimpleResponse> {
        return this.http.put<SimpleResponse>(Constants.transportRequest, request).pipe(
            map((body) => {
                return new SimpleResponse(true, '', body);
            }),
            catchError(async (err) => {
                console.log(err);
                return new SimpleResponse(false, err?.error?.value);
            })
        );
    }

    public deleteTransport(transportId: String): Observable<SimpleResponse> {
        return this.http.delete<SimpleResponse>(`${Constants.transportRequest}/${transportId}`).pipe(
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
