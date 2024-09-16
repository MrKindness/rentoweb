import { Component, effect, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogService } from '../../../../services/dialog.service';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';
import { AdminUserComponent } from '../admin-user/admin-user.component';
import { NewAdminUserComponent } from '../new-user-admin/new-admin-user.component';

@Component({
    selector: 'admin-users-tab-component',
    templateUrl: './admin-users-tab.component.html',
    styleUrls: ['./admin-users-tab.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, AdminUserComponent, NewAdminUserComponent],
    standalone: true,
})
export class AdminUsersTabComponent {
    currentUser = input<User>();
    users: User[] = [];
    showNewUserForm: boolean = false;

    userService = inject(UserService);
    dialogService = inject(DialogService);

    constructor() {
        effect(() => {
            this.updateUsersList();
        });
    }

    updateUsersList() {
        this.userService.getAllUsers().subscribe((response) => {
            if (response.success) {
                this.users = response.body;
                this.showNewUserForm = false;
            } else {
                this.users = [];
                this.dialogService.openSimpleDialog('Request error!', '');
            }
        });
    }
}
