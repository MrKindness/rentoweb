import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Constants } from '../../utils/constants';
import { MyTransportsComponent } from '../my-transports/my-transports.component';
import { RentedTransportsComponent } from '../rented-transports/rented-transports.component';
import { MainTransportsComponent } from '../main-transports/main-transports.component';
import { User } from '../../model/user';

export enum MainComponentState {
    myTransports,
    rentedTransports,
    mainTransports,
    settings,
    transports,
    users,
}

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports:[MatToolbarModule, MatIconModule, MatButtonModule, 
            MainTransportsComponent, MyTransportsComponent, RentedTransportsComponent],
    standalone: true
})
export class MainComponent implements OnInit{
    MainComponentState = MainComponentState;
    user?:User;
    state: MainComponentState = MainComponentState.myTransports;

    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(
            (response) => response.success ? this.user = response.body : this.user = undefined
        )
    }

    logInClick() {
        this.router.navigateByUrl(Constants.authPage);
    }

    logOutClick() {
        this.user = undefined;
        this.authService.logoutUser();
    }
}