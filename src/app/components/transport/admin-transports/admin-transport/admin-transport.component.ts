import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Transport } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';
import { SimpleResponse } from '../../../../model/simple-response';
import { User } from '../../../../model/user';

@Component({
    selector: 'admin-transport-component',
    templateUrl: './admin-transport.component.html',
    styleUrls: ['./admin-transport.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
    standalone: true,
})
export class AdminTransportComponent {
    transport = input.required<Transport>();
    transportDeleted = output();
    disableDeleteButton: boolean = false;

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    ownerInfoClick() {
        this.dialogService.openUserInfoDialog(this.transport().owner);
    }

    renterInfoClick() {
        if (this.transport().renter) {
            this.dialogService.openUserInfoDialog(this.transport().renter);
        }
    }

    deleteClick() {
        this.disableDeleteButton = true;
        this.transportService.deleteTransport(this.transport().uuid).subscribe((result: SimpleResponse) => {
            if (result.success) {
                this.dialogService.openSimpleDialog('Success', 'Transport was deleted!');
                this.transportDeleted.emit();
            } else {
                this.dialogService.openSimpleDialog('Error', result.value);
            }
            this.disableDeleteButton = false;
        });
    }
}
