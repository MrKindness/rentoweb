import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Transport } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';
import { MainTransportComponent } from '../main-transport/main-transport.component';
import { User } from '../../../../model/user';
@Component({
    selector: 'main-transports-tab-component',
    templateUrl: './main-transports-tab.component.html',
    styleUrls: ['./main-transports-tab.component.scss'],
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, MainTransportComponent],
    standalone: true,
})
export class MainTransportsTabComponent {
    transports: Transport[] = [];
    user = input<User>();

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    ngOnInit(): void {
        this.updateTransportsList();
    }

    updateTransportsList() {
        this.transportService.getAvailableTransports().subscribe((response) => {
            console.log(response);
            if (response.success) {
                this.transports = response.body;
            } else {
                this.transports = [];
                this.dialogService.openSimpleDialog('Request error!', '');
            }
        });
    }
}
