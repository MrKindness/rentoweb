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
import { MatSelectModule } from '@angular/material/select';
import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { SimpleResponse } from '../../../../model/simple-response';
import { Transport, TransportUpdateRequest } from '../../../../model/transport';
import { DialogService } from '../../../../services/dialog.service';
import { TransportService } from '../../../../services/transport.service';

@Component({
    selector: 'my-transport-component',
    templateUrl: './my-transport.component.html',
    styleUrls: ['./my-transport.component.scss'],
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
        MatSelectModule,
    ],
    standalone: true,
})
export class MyTransportComponent implements OnInit {
    transport = input.required<Transport>();
    transportDeletedEvent = output();

    initialTransport: Transport = new Transport();
    disableSaveButton: boolean = true;
    disableUpdateButton: boolean = false;
    disableCancelButton: boolean = true;
    disableDeleteButton: boolean = false;
    isEditting: boolean = false;
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

    filteredOptions: Observable<String[]> = this.locationControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
            this.transport().location = value || '';
            return this._filter((value as string) || '');
        })
    );

    transportService = inject(TransportService);
    dialogService = inject(DialogService);

    constructor() {
        effect(() => {
            Transport.copy(this.transport(), this.initialTransport);
        });
    }

    ngOnInit(): void {
        this.locationControl.setValue(this.transport().location as string);
    }

    renterInfoClick() {
        if (this.transport().renter) {
            this.dialogService.openUserInfoDialog(this.transport().renter);
        }
    }

    updateClick() {
        this.isEditting = true;
        this.disableUpdateButton = true;
        this.disableSaveButton = false;
        this.disableCancelButton = false;
        this.disableDeleteButton = false;
    }

    deleteClick() {
        let oldIsEditting = this.isEditting;
        this.isEditting = false;
        this.disableUpdateButton = true;
        this.disableSaveButton = true;
        this.disableCancelButton = true;
        this.disableDeleteButton = true;

        this.transportService.deleteTransport(this.transport().uuid).subscribe((result: SimpleResponse) => {
            if (result.success) {
                this.dialogService.openSimpleDialog('Success', 'Transport was deleted!');
                this.transportDeletedEvent.emit();
            } else {
                this.dialogService.openSimpleDialog('Error', result.value);
                this.disableDeleteButton = false;
                this.disableSaveButton = false;
                this.disableCancelButton = false;
                this.disableUpdateButton = false;
                this.isEditting = oldIsEditting;
            }
        });
    }

    cancelClick() {
        Transport.copy(this.initialTransport, this.transport());

        this.isEditting = false;
        this.disableCancelButton = true;
        this.disableUpdateButton = false;
        this.disableSaveButton = true;
        this.disableDeleteButton = false;
    }

    saveClick() {
        console.log(this.transport());
        this.disableSaveButton = true;
        this.disableUpdateButton = true;
        this.disableCancelButton = true;
        this.disableDeleteButton = true;

        if (!this.transport().brand || !this.transport().model || !this.transport().year) {
            this.dialogService.openSimpleDialog('Invalid data!', 'The brand, model, and year fields are required!');
            this.disableSaveButton = false;
            this.disableCancelButton = false;
            this.disableDeleteButton = false;
            this.disableUpdateButton = false;
            this.isEditting = true;
        } else {
            let request = new TransportUpdateRequest(this.transport());
            this.transportService.updateTransport(request).subscribe((result: SimpleResponse) => {
                if (result.success) {
                    console.log(this.transport());
                    console.log(this.initialTransport);
                    this.dialogService.openSimpleDialog('Success', 'Transport was updated!');
                    Transport.copy(result.body, this.transport());
                    Transport.copy(result.body, this.initialTransport);
                    console.log(result.body);
                    console.log(this.transport());
                    console.log(this.initialTransport);

                    this.isEditting = false;
                    this.disableSaveButton = true;
                    this.disableUpdateButton = false;
                    this.disableCancelButton = true;
                    this.disableDeleteButton = false;
                } else {
                    this.dialogService.openSimpleDialog('Error', result.value);
                    this.disableSaveButton = false;
                    this.disableDeleteButton = false;
                    this.disableCancelButton = false;
                    this.disableUpdateButton = true;
                    this.isEditting = true;
                }
            });
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().includes(filterValue));
    }
}
