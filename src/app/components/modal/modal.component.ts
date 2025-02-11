import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  hide() {
    throw new Error('Method not implemented.');
  }
  @Input() title: string = 'Confirmación';
  @Input() message: string = '';
  
  @ViewChild('modalElement') modalElement!: ElementRef;

  show() {
    if (this.modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modalInstance.show();
    }
  }
}