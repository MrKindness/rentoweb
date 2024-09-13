import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'rented-transports-component',
    templateUrl: './rented-transports.component.html',
    styleUrls: ['./rented-transports.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    standalone: true,
})
export class RentedTransportsComponent {}
