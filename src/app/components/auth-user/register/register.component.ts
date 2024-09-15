import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SimpleResponse } from '../../../model/simple-response';
import { UserCreateRequest } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from '../../../services/dialog.service';
import { Constants } from '../../../utils/constants';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    standalone: true,
})
export class RegisterComponent {
    passwordVisibility: boolean = false;
    disableButton: boolean = false;
    user: UserCreateRequest = new UserCreateRequest();

    private authService = inject(AuthService);
    private router = inject(Router);
    private dialogService = inject(DialogService);

    hideClick(event: MouseEvent) {
        this.passwordVisibility = !this.passwordVisibility;
        event.stopPropagation();
    }

    async signInClick() {
        this.router.navigateByUrl(Constants.authPage);
    }

    async registerClick() {
        this.disableButton = true;

        if (!this.user.username || !this.user.name || !this.user.email || !this.user.password) {
            this.dialogService.openSimpleDialog('Error', 'The username, name, email and password fields are required!');
            this.disableButton = false;
        } else {
            this.authService.register(this.user).subscribe((result: SimpleResponse) => {
                result.success ? this.router.navigateByUrl('') : this.dialogService.openSimpleDialog('Error', result.value);
                this.disableButton = false;
            });
        }
    }
}
