import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Constants } from '../../utils/constants';
import { User } from '../../model/user';
import { RentedTransportsTabComponent } from '../transport/rented-transports/rented-transports-tab/rented-transports-tab.component';
import { MainTransportsTabComponent } from '../transport/main-transports/main-transports-tab/main-transports-tab.component';
import { MyTransportsTabComponent } from '../transport/my-transports/my-transports-tab/my-transports-tab.component';

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
    imports: [MatToolbarModule, MatButtonModule, MainTransportsTabComponent, MyTransportsTabComponent, RentedTransportsTabComponent],
    standalone: true,
})
export class MainComponent implements OnInit {
    MainComponentState = MainComponentState;
    user?: User;
    state: MainComponentState = MainComponentState.mainTransports;

    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((response) => (response.success ? (this.user = response.body) : (this.user = undefined)));
    }

    logInClick() {
        this.router.navigateByUrl(Constants.authPage);
    }

    logOutClick() {
        this.user = undefined;
        this.authService.logoutUser();
        this.state = MainComponentState.mainTransports;
    }
}
