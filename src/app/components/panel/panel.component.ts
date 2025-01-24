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

  constructor(private fb: FormBuilder) {
    this.panelForm = this.fb.group({
      countPages: [1],
      countLanguages: [1]
    });
  }


  panelExtraPrice = inject(BudgetService).panelExtraPrice;
  pages = inject(BudgetService).pages;
  languages = inject(BudgetService).languages;



  checkPages() {
    const currentValue = this.panelForm.get('countPages')?.value || 1;
    if (isNaN(currentValue) || currentValue < 1) {
      this.panelForm.get('countPages')?.setValue(1);
    }
    this.update()
  }

  checkLanguages() {
    const currentValue = this.panelForm.get('countLanguages')?.value || 1;
    if (isNaN(currentValue) || currentValue < 1) {
      this.panelForm.get('countLanguages')?.setValue(1);
    }
    this.update()
  }

  increment(type: string) {
    if (type === 'pages') {
      const currentValue = this.panelForm.get('countPages')?.value || 1;
    this.panelForm.get('countPages')?.setValue(currentValue + 1);
    this.checkPages()
    } else if (type === 'languages') {  
      const currentValue = this.panelForm.get('countLanguages')?.value || 1;
    this.panelForm.get('countLanguages')?.setValue(currentValue + 1);
    this.checkLanguages()
    }
  }

  decrement(type: string) {  
    if (type === 'pages') {
      const currentValue = this.panelForm.get('countPages')?.value || 1;
    this.panelForm.get('countPages')?.setValue(currentValue - 1);
    this.checkPages()
    } else if (type === 'languages') {  
      const currentValue = this.panelForm.get('countLanguages')?.value || 1;
    this.panelForm.get('countLanguages')?.setValue(currentValue - 1);
    this.checkLanguages()
    }
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

  update() {
    this.pages.update(value => this.panelForm.get('countPages')?.value || 1);
    this.languages.update(value => this.panelForm.get('countLanguages')?.value || 1);
    this.panelExtraPrice.update(value => (this.panelForm.get('countPages')?.value || 1) * (this.panelForm.get('countLanguages')?.value || 1) * 30 - 30);
    this.disabledButton();
  }

  resetForm(): void {
    this.panelForm.reset({ countPages: 1, countLanguages: 1 });
  }

}
