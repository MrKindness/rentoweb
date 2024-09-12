import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { TransportService } from '../../services/transport.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { User } from '../../model/user';
import { Transport, TransportCreateRequest } from '../../model/transport';
import { SimpleResponse } from '../../model/simple-response';

@Component({
    selector: 'my-transports-component',
    templateUrl: './my-transports.component.html',
    styleUrls: ['./my-transports.component.scss'],
    imports:[
        MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
        MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, 
        FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
    standalone: true
})
export class MyTransportsComponent implements OnInit{
    @Input() user?: User;
    newTransport: TransportCreateRequest = new TransportCreateRequest();
    myControl = new FormControl('');
    showNewTransportForm = false;
    disableSaveButton = false;
    transports:Transport[] = [];
    options: string[] = ['Chisinau', 'Tiraspol', 'Balti', 'Bender', 'Ribnita', 'Ungheni', 
        'Cahul', 'Soroca', 'Orhei', 'Dubasari', 'Comrat', 'Straseni', 'Durlesti', 
        'Ceadir-Lunga', 'Causeni', 'Codru', 'Edinet', 'Drochia', 'Ialoveni', 'Hincesti'];
    filteredOptions: Observable<String[]> = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => {
                this.newTransport.location = value || ''; 
                return this._filter(value || '')
            })
        );

    transportService = inject(TransportService);
    dialogService = inject(DialogService);
    
    ngOnInit(): void {
        this.updateTransportsList();
    }

    createTransportClick() {
        this.disableSaveButton = true;

        if(!this.user) {
            return;
        }

        if(!this.newTransport.brand || !this.newTransport.model || !this.newTransport.year) {
            this.dialogService.openDialog('Invalid data!', 'The brand, model, and year fields are required!');
            this.disableSaveButton = false;
        } else {
            this.newTransport.owner = this.user.username;
            this.transportService.createTransport(this.newTransport).subscribe(
                (result:SimpleResponse) => {
                    if(result.success) {
                        this.dialogService.openDialog('Success', 'Transport was created!')
                        this.updateTransportsList();
                    } else {
                        this.dialogService.openDialog('Error', result.value)
                    }
                    this.disableSaveButton = false;
                }
            );
        }
    }

    private updateTransportsList() {
        this.transportService.getTransportsByOwner().subscribe(
            (response) => {
                if(response.success) {
                    this.transports = response.body
                } else {
                    this.transports = []
                    this.dialogService.openDialog('Request error!', '');
                }
            }
        )
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}