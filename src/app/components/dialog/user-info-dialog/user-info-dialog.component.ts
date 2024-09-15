import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'user-info-dialog-component',
    templateUrl: 'user-info-dialog.component.html',
    styleUrls: ['./user-info-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatInputModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoDialogComponent {
    data = inject(MAT_DIALOG_DATA);
}
