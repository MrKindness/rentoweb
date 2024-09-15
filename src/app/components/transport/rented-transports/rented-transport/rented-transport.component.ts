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

@Component({
    selector: 'rented-transport-component',
    templateUrl: './rented-transport.component.html',
    styleUrls: ['./rented-transport.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
    standalone: true,
})
export class RentedTransportComponent {
    transport = input.required<Transport>();

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    renterInfoClick() {
        this.dialogService.openUserInfoDialog(this.transport().renter);
    }
}
