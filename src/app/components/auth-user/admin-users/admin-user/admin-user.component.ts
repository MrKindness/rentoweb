import { Component, inject, input, output } from '@angular/core';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';
import { DialogService } from '../../../../services/dialog.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SimpleResponse } from '../../../../model/simple-response';

@Component({
    selector: 'admin-user-component',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule],
    standalone: true,
})
export class AdminUserComponent {
    user = input.required<User>();
    userDeletedEvent = output();
    oldRole: String = '';
    disableDeleteButton: boolean = false;

    userService = inject(UserService);
    dialogService = inject(DialogService);

    deleteClick() {
        this.disableDeleteButton = true;
        this.userService.deleteUser(this.user().username).subscribe((result: SimpleResponse) => {
            if (result.success) {
                this.dialogService.openSimpleDialog('Success', 'User was deleted!');
                this.userDeletedEvent.emit();
            } else {
                this.dialogService.openSimpleDialog('Error', result.value);
            }
            this.disableDeleteButton = false;
        });
    }
}
