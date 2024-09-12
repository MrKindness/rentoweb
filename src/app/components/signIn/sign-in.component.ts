import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { SimpleResponse } from '../../model/simple-response';
import { Router } from '@angular/router';
import { Constants } from '../../utils/constants';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'sign-in-component',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    imports:[FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    standalone: true
})
export class SignInComponent {
    passwordVisibility: boolean = false;
    disableButton: boolean = false;
    username: string = '';
    password: string = '';

    private authService = inject(AuthService);
    private router = inject(Router);
    private dialogService = inject(DialogService);

    hideClick(event: MouseEvent) {
        this.passwordVisibility = !this.passwordVisibility;
        event.stopPropagation();
    }

    async signInClick() {
        this.disableButton = true;
        this.authService.signIn(this.username, this.password).subscribe(
            (result:SimpleResponse) => {
                result.success ? this.router.navigateByUrl('') : this.dialogService.openDialog('Error', result.value);
                this.disableButton = false;
            }
        );
    }

    async registerClick() {
        this.router.navigateByUrl(Constants.registerPage);
    }
}
