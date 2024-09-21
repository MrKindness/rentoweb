import { Component, effect, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Transport } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';
import { AdminTransportComponent } from '../admin-transport/admin-transport.component';
import { User } from '../../../../model/user';

@Component({
    selector: 'admin-transports-tab-component',
    templateUrl: './admin-transports-tab.component.html',
    styleUrls: ['./admin-transports-tab.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, AdminTransportComponent],
    standalone: true,
})
export class AdminTransportsTabComponent {
    user = input<User>();
    transports: Transport[] = [];

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    constructor() {
        effect(() => {
            this.updateTransportsList();
        });
    }

    updateTransportsList() {
        this.transportService.getAllTransports().subscribe((response) => {
            if (response.success) {
                this.transports = response.body;
            } else {
                this.transports = [];
                this.dialogService.openSimpleDialog('Request error!', '');
            }
        });
    }
}
