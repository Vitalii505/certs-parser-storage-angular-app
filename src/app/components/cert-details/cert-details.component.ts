import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.css'],
})
export class CertDetailsComponent {
  @Input()
  selected = false;
  @Input()
  title = '';
  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  handleDeleteClick = () => {
    this.delete.emit();
  };
}
