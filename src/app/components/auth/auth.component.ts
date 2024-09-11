import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../model/auth/auth-response';
import { Router } from '@angular/router';
import { Constants } from '../../utils/constants';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports:[FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    standalone: true
})
export class AuthComponent {
    passwordVisibility: boolean = false;
    showErrorMessage: boolean = false;
    disableButton: boolean = false;
    username: string = '';
    password: string = '';

    private authService = inject(AuthService);
    private router = inject(Router);

    hideClick(event: MouseEvent) {
        this.passwordVisibility = !this.passwordVisibility;
        event.stopPropagation();
    }

    async signInClick() {
        this.disableButton = true;
        this.authService.signIn(this.username, this.password).subscribe(
            (result:AuthResponse) => {
                console.log(result);
                if(result.result) {
                    this.router.navigateByUrl('');
                } else {
                    this.showErrorMessage = true;
                }
                this.disableButton = false;
            }
        );
    }

    async registerClick() {
        this.router.navigateByUrl(Constants.registerPage);
    }
}
