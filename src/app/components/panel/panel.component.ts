import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  panelForm: FormGroup;

  budgetService = inject(BudgetService);
  panelExtraPrice = this.budgetService.panelExtraPrice;
  pages = this.budgetService.pages;
  languages = this.budgetService.languages;

  @ViewChild('confirmationModal') confirmationModal: ModalComponent | undefined;
  modalTitle = signal('');
  modalMessage = signal('');


  constructor(private fb: FormBuilder) {
    this.panelForm = this.fb.group({
      countPages: [this.pages()],
      countLanguages: [this.languages()]
    });

    this.panelForm.valueChanges.subscribe(() => {
      this.validateAndSyncInput('countPages');
      this.validateAndSyncInput('countLanguages');
      this.update();
    });

    // Sincronizar señales con valores iniciales
    effect(() => {
      this.panelForm.patchValue({
        countPages: this.pages(),
        countLanguages: this.languages(),
      });
    });
  }

  // Validar valor y sincronizar el input si es inválido
  validateAndSyncInput(controlName: string) {
    const control = this.panelForm.get(controlName);
    const currentValue = control?.value || 1;

    if (isNaN(currentValue) || currentValue < 1) {
      control?.setValue(1, { emitEvent: false }); // Cambiar el valor del formulario
    }
  }

 
  modifyValue(type: 'pages' | 'languages', action: 'increment' | 'decrement') {
    const controlName = type === 'pages' ? 'countPages' : 'countLanguages';
    const currentValue = this.panelForm.get(controlName)?.value || 1;

    const newValue =
      action === 'increment'
        ? currentValue + 1
        : Math.max(1, currentValue - 1); // Evitar valores menores que 1

    this.panelForm.get(controlName)?.setValue(newValue);
  }

  // Función de actualización
  update() {
    const pagesValue = this.panelForm.get('countPages')?.value || 1;
    const languagesValue = this.panelForm.get('countLanguages')?.value || 1;

    this.pages.set(pagesValue);
    this.languages.set(languagesValue);
    this.panelExtraPrice.set(pagesValue * languagesValue * 30 - 30);
  }

  // Resetear formulario
  resetForm(): void {
    this.panelForm.reset({ countPages: 1, countLanguages: 1 });
    this.update();
  }


 // Abrir el modal con título y mensaje dinámico
 openModal(type: string) {
  if (type === 'pages') {
    this.modalTitle.set('Nombre de pàgines');
    this.modalMessage.set('Afegeix el nombre de pàgines que tindrà el teu projecte. El preu extra per aquesta opció és de 30€ per pàgina.');
  } else if (type === 'languages') {
    this.modalTitle.set('Nombre de llenguatges');
    this.modalMessage.set('Afegeix el nombre de llenguatges que tindrà el teu projecte. El preu extra per aquesta opció és de 30€ per llenguatge.');
  }

  // Abrir el modal directamente sin *ngIf
  if (this.confirmationModal) {
    this.confirmationModal.show(); // Asumiendo que tienes un método show() en tu ModalComponent
  }
}

// Cerrar el modal
closeModal() {
  if (this.confirmationModal) {
    this.confirmationModal.hide(); // Asumiendo que tienes un método hide() en tu ModalComponent
  }
}
}
