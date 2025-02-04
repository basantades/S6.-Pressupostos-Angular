import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  panelForm: FormGroup;

  budgetService = inject(BudgetService);
  panelExtraPrice = this.budgetService.panelExtraPrice;
  pages = this.budgetService.pages;
  languages = this.budgetService.languages;

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

}
