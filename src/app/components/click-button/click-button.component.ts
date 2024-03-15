import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.css'],
})
export class ClickButtonComponent {
  @Input()
  title = '';
  @Output()
  clicked: EventEmitter<void> = new EventEmitter<void>();

  handleClick = () => {
    this.clicked.emit();
  };
}
