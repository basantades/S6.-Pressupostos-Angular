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

  // panelForm = new FormGroup({
  // countPages: new FormControl(1), 
  // countLanguages:new FormControl(1),
  // });

  panelForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.panelForm = this.fb.group({
      countPages: [1],
      countLanguages: [1]
    });
  }


  panelExtraPrice = inject(BudgetService).panelExtraPrice;

  increment(type: string) {
    if (type === 'pages') {
      const currentValue = this.panelForm.get('countPages')?.value || 1;
    this.panelForm.get('countPages')?.setValue(currentValue + 1);
    } else if (type === 'languages') {  
      const currentValue = this.panelForm.get('countLanguages')?.value || 1;
    this.panelForm.get('countLanguages')?.setValue(currentValue + 1);
    }
    this.calculateExtraPrice();
  }

  decrement(type: string) {  
    if (type === 'pages') {
      const currentValue = this.panelForm.get('countPages')?.value || 1;
    this.panelForm.get('countPages')?.setValue(currentValue - 1);
    } else if (type === 'languages') {  
      const currentValue = this.panelForm.get('countLanguages')?.value || 1;
    this.panelForm.get('countLanguages')?.setValue(currentValue - 1);
    }
    this.calculateExtraPrice();
  }

  disabledButton() {
      const botondecrementar = document.querySelector('#boton-decrementar-pages');
      if (botondecrementar) { 
        if (this.panelForm.get('countPages')?.value === 1) {
          botondecrementar.setAttribute('disabled', 'true');
        } else {
          botondecrementar.removeAttribute('disabled');
        }
      }
        const botondecrementarLanguages = document.querySelector('#boton-decrementar-languages');
        if (botondecrementarLanguages) { 
          if (this.panelForm.get('countLanguages')?.value === 1) {
            botondecrementarLanguages.setAttribute('disabled', 'true');
          } else {
            botondecrementarLanguages.removeAttribute('disabled');
          }
        }
  }

  
  calculateExtraPrice() {
    this.panelExtraPrice.update(value => (this.panelForm.get('countPages')?.value || 1) * (this.panelForm.get('countLanguages')?.value || 1) * 30 - 30);
    this.disabledButton();
  }

  resetForm(): void {
    this.panelForm.reset({ countPages: 1, countLanguages: 1 });
  }

}
