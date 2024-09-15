import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../components/dialog/simple-dialog/simple-dialog.component';
import { User } from '../model/user';
import { UserInfoDialogComponent } from '../components/dialog/user-info-dialog/user-info-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialog = inject(MatDialog);

    openSimpleDialog(title: String, message: String) {
        this.dialog.open(SimpleDialogComponent, {
            data: {
                title: title,
                message: message,
            },
        });
    }

    openUserInfoDialog(user: User) {
        this.dialog.open(UserInfoDialogComponent, {
            data: {
                user: user,
            },
        });
    }
}
