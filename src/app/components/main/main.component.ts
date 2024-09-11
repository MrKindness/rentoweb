import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user/user';
import { Constants } from '../../utils/constants';

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports:[MatToolbarModule, MatIconModule, MatButtonModule],
    standalone: true
})
export class MainComponent implements OnInit{
    user?:User;

    private authService = inject(AuthService);
    private userService = inject(UserService);
    private router = inject(Router);

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(
            (user) => {
                if(user) {
                    this.user = user;
                } else {
                    this.user = undefined;
                }
            }
        )
    }

    loginClick() {
        this.router.navigateByUrl(Constants.authPage);
    }

    logoutClick() {
        this.user = undefined;
        this.authService.logoutUser();
    }
}