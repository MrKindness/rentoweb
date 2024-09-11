import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'toolbar-component',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
})
export class ToolbarComponent {
    @Input() message: string = 'Settings';

    @Output() editUserEvent: EventEmitter<void> = new EventEmitter();

    editAccount() {
        this.editUserEvent.emit();
    }
}
