import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User, UserRequest } from '../../../model/user';
import { DialogService } from '../../../services/dialog.service';
import { Constants } from '../../../utils/constants';
import { UserService } from '../../../services/user.service';
import { SimpleResponse } from '../../../model/simple-response';

@Component({
    selector: 'settings-component',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
    standalone: true,
})
export class SettingsComponent {
    editEndEvent = output<User>();
    user = input<User>();
    userEdit: UserRequest = new UserRequest();
    passwordVisibility: boolean = false;
    disableSaveButton: boolean = false;

    private dialogService = inject(DialogService);
    private userService = inject(UserService);

    constructor() {
        effect(() => {
            this.resetInput();
        });
    }

    hideClick(event: MouseEvent) {
        this.passwordVisibility = !this.passwordVisibility;
        event.stopPropagation();
    }

    async cancelClick() {
        this.resetInput();
        this.editEndEvent.emit(this.user()!);
    }

    async saveClick() {
        this.disableSaveButton = true;
        if (!this.userEdit.name || !this.userEdit.email) {
            this.dialogService.openSimpleDialog('Error', 'The name and email fields are required!');
            this.disableSaveButton = false;
        } else {
            this.userService.updateUser(this.userEdit).subscribe((result: SimpleResponse) => {
                if (result.success) {
                    this.dialogService.openSimpleDialog('Success', 'User was updated!');
                    this.editEndEvent.emit(result.body);
                } else {
                    this.dialogService.openSimpleDialog('Error', result.value);
                }
                this.disableSaveButton = false;
            });
        }
    }

    private resetInput() {
        this.userEdit.username = this.user()!.username;
        this.userEdit.name = this.user()!.name;
        this.userEdit.email = this.user()!.email;
        this.userEdit.phone = this.user()!.phone;
        this.userEdit.password = '';
    }
}
