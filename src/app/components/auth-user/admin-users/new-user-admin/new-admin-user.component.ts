import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SimpleResponse } from '../../../../model/simple-response';
import { DialogService } from '../../../../services/dialog.service';
import { UserRequest } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'new-admin-user-component',
    templateUrl: './new-admin-user.component.html',
    styleUrls: ['./new-admin-user.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule],
    standalone: true,
})
export class NewAdminUserComponent {
    disableSaveButton: boolean = false;
    cancelClickEvent = output();
    userCreatedEvent = output();

    user: UserRequest = new UserRequest();

    userService = inject(UserService);
    dialogService = inject(DialogService);

    cancelClick() {
        this.cancelClickEvent.emit();
    }

    saveClick() {
        console.log(this.user);
        this.disableSaveButton = true;

        if (!this.user.username || !this.user.name || !this.user.email || !this.user.role) {
            this.dialogService.openSimpleDialog('Invalid data!', 'The username, name, role and email fields are required!');
            this.disableSaveButton = false;
        } else {
            this.userService.createUserByAdmin(this.user).subscribe((result: SimpleResponse) => {
                if (result.success) {
                    this.dialogService.openSimpleDialog('Success', 'User was created!');
                    this.userCreatedEvent.emit();
                } else {
                    this.dialogService.openSimpleDialog('Error', result.value);
                }
                this.disableSaveButton = false;
            });
        }
    }
}
