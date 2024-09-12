import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector: 'main-transports-component',
    templateUrl: './main-transports.component.html',
    styleUrls: ['./main-transports.component.scss'],
    imports:[MatToolbarModule, MatIconModule, MatButtonModule],
    standalone: true
})
export class MainTransportsComponent {
}