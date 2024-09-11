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
import { UserCreateRequest } from '../../model/user/user-create-request';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports:[FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    standalone: true
})
export class RegisterComponent {
    passwordVisibility: boolean = false;
    showErrorMessage: boolean = false;
    disableButton: boolean = false;
    errorMessage:String = '';
    user: UserCreateRequest= new UserCreateRequest();

    private authService = inject(AuthService);
    private router = inject(Router);

    hideClick(event: MouseEvent) {
        this.passwordVisibility = !this.passwordVisibility;
        event.stopPropagation();
    }

    async signInClick() {
        this.router.navigateByUrl(Constants.authPage);
    }

    async registerClick() {
        this.disableButton = true;

        if(!this.user.username || !this.user.name || !this.user.email || !this.user.password) {
            this.errorMessage = 'The username, name, email and password fields are required!';
            this.showErrorMessage = true;
        } else {
            this.authService.register(this.user).subscribe(
                (result:AuthResponse) => {
                    if(result.result) {
                        this.router.navigateByUrl('');
                    } else {
                        this.errorMessage = 'Invalid data!';
                        this.showErrorMessage = true;
                    }
                    this.disableButton = false;
                }
            );
        }
        this.disableButton = false;
    }
}
