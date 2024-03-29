import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-certs-list',
  templateUrl: './certs-list.component.html',
})
export class CertsListComponent {
  @Input()
  data: { serialNumber: string; commonName: string }[] = [];
  @Input()
  selectedId = '';

  @Output()
  clicked: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  handleClick = (id: string) => {
    this.selectedId = id;
    this.clicked.emit(id);
  };

  handleDelete = (id: string) => {
    this.delete.emit(id);
  };
}
