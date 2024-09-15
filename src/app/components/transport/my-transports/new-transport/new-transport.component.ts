import { Component, inject, input, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, startWith, map } from 'rxjs';
import { SimpleResponse } from '../../../../model/simple-response';
import { TransportCreateRequest } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';

@Component({
    selector: 'new-transport-component',
    templateUrl: './new-transport.component.html',
    styleUrls: ['./new-transport.component.scss'],
    imports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
    ],
    standalone: true,
})
export class NewTransportComponent {
    disableSaveButton: boolean = false;
    username = input<String>();
    cancelClickEvent = output();
    transportCreatedEvent = output();

    transport: TransportCreateRequest = new TransportCreateRequest();
    locationControl = new FormControl('');
    options: string[] = [
        'Chisinau',
        'Tiraspol',
        'Balti',
        'Bender',
        'Ribnita',
        'Ungheni',
        'Cahul',
        'Soroca',
        'Orhei',
        'Dubasari',
        'Comrat',
        'Straseni',
        'Durlesti',
        'Ceadir-Lunga',
        'Causeni',
        'Codru',
        'Edinet',
        'Drochia',
        'Ialoveni',
        'Hincesti',
    ];

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    filteredOptions: Observable<String[]> = this.locationControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
            this.transport.location = value || '';
            return this._filter(value || '');
        })
    );

    cancelClick() {
        this.cancelClickEvent.emit();
    }

    saveClick() {
        this.disableSaveButton = true;

        if (!this.username()) {
            return;
        }

        if (!this.transport.brand || !this.transport.model || !this.transport.year) {
            this.dialogService.openSimpleDialog('Invalid data!', 'The brand, model, and year fields are required!');
            this.disableSaveButton = false;
        } else {
            this.transport.owner = this.username() || '';
            this.transportService.createTransport(this.transport).subscribe((result: SimpleResponse) => {
                if (result.success) {
                    this.dialogService.openSimpleDialog('Success', 'Transport was created!');
                    this.transportCreatedEvent.emit();
                } else {
                    this.dialogService.openSimpleDialog('Error', result.value);
                }
                this.disableSaveButton = false;
            });
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().includes(filterValue));
    }
}
