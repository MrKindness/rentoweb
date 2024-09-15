import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'simple-dialog-component',
    templateUrl: 'simple-dialog.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialogComponent {
    data = inject(MAT_DIALOG_DATA);
}
