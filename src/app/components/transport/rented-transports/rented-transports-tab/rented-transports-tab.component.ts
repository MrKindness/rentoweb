import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Transport } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';
import { RentedTransportComponent } from '../rented-transport/rented-transport.component';

@Component({
    selector: 'rented-transports-tab-component',
    templateUrl: './rented-transports-tab.component.html',
    styleUrls: ['./rented-transports-tab.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RentedTransportComponent],
    standalone: true,
})
export class RentedTransportsTabComponent {
    transports: Transport[] = [];

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    ngOnInit(): void {
        this.updateTransportsList();
    }

    updateTransportsList() {
        this.transportService.getRentedTransports().subscribe((response) => {
            if (response.success) {
                this.transports = response.body;
            } else {
                this.transports = [];
                this.dialogService.openSimpleDialog('Request error!', '');
            }
        });
    }
}
