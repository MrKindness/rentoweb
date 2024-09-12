import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "../components/dialog/dialog.component";

@Injectable({providedIn: 'root'})
export class DialogService {

    private dialog = inject(MatDialog);

    openDialog(title:String, message:String) {
        this.dialog.open(SimpleDialogComponent, {
            data: {
                title: title,
                message: message
            },
        });
    }
}