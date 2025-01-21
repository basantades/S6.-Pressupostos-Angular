import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  countPages = new FormControl(1); 
  countLanguages = new FormControl(1);
  panelExtraPrice = inject(BudgetService).panelExtraPrice;

  increment(type: string) {
    if (type === 'pages') {
      if (this.countPages.value != null) this.countPages.setValue(this.countPages.value + 1);
    } else if (type === 'languages') {  
      if (this.countLanguages.value != null) this.countLanguages.setValue(this.countLanguages.value + 1);
    }
    this.calculateExtraPrice();
  }

  decrement(type: string) {  
    if (type === 'pages') {
      if (this.countPages.value != null) this.countPages.setValue(this.countPages.value - 1);
    } else if (type === 'languages') {  
      if (this.countLanguages.value != null) this.countLanguages.setValue(this.countLanguages.value - 1);
    }
    this.calculateExtraPrice();
  }

  disbledButton() {
      const botondecrementar = document.querySelector('#boton-decrementar-pages');
      if (botondecrementar) { 
        if (this.countPages.value === 1) {
          botondecrementar.setAttribute('disabled', 'true');
        } else {
          botondecrementar.removeAttribute('disabled');
        }
      }
        const botondecrementarLanguages = document.querySelector('#boton-decrementar-languages');
        if (botondecrementarLanguages) { 
          if (this.countLanguages.value === 1) {
            botondecrementarLanguages.setAttribute('disabled', 'true');
          } else {
            botondecrementarLanguages.removeAttribute('disabled');
          }
        }
  }
  
  actualizeValue() {
    let currentValue = this.budgetService.panelExtraPrice();
    this.budgetService.updateValue(currentValue);
  }
  
  calculateExtraPrice() {
    this.panelExtraPrice.update(value => (this.countPages.value ?? 1) * (this.countLanguages.value ?? 1) * 30 - 30);
    this.actualizeValue();
    this.disbledButton();
  }


  constructor(private budgetService: BudgetService) {}



}
