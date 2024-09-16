import { Component, inject, input, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Transport } from '../../../../model/transport';
import { User } from '../../../../model/user';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';
import { MyTransportComponent } from '../my-transport/my-transport.component';
import { NewTransportComponent } from '../new-transport/new-transport.component';

@Component({
    selector: 'my-transports-tab-component',
    templateUrl: './my-transports-tab.component.html',
    styleUrls: ['./my-transports-tab.component.scss'],
    imports: [MatButtonModule, MatDialogModule, NewTransportComponent, MyTransportComponent],
    standalone: true,
})
export class MyTransportsTabComponent implements OnInit {
    user = input<User>();
    showNewTransportForm = false;
    transports: Transport[] = [];

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    ngOnInit(): void {
        this.updateTransportsList();
    }

    updateTransportsList() {
        this.transportService.getTransportsByOwner().subscribe((response) => {
            if (response.success) {
                this.transports = response.body;
                this.showNewTransportForm = false;
            } else {
                this.transports = [];
                this.dialogService.openSimpleDialog('Request error!', '');
            }
        });
    }
}
