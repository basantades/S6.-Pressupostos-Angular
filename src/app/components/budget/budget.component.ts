import { Component, Input, inject, effect} from '@angular/core';
import { Budget } from '../../interfaces/budget';
import { BudgetService } from '../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
// import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-budget',
  imports: [PanelComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
@Input() budgets: Budget[] = []

BudgetService = inject(BudgetService);

valueExtra: number = 0;

constructor(private budgetService: BudgetService) {
  this.budgets = this.BudgetService.getBudgets()
  effect(() => {
    this.valueExtra = this.budgetService.panelExtraPrice();
    this.budgetService.budgets[2].price = 500 + this.valueExtra
    this.actualizeTotalPrice();
  });
}
serviciosContratados: Budget[] = [];
totalPrice: number = 0;

  onCheckboxChange(event: any, budgetPrice: number, budgetId: number) {
    if (event.target.checked) {
      this.serviciosContratados.push(this.budgets.find(budget => budget.id === budgetId)!);
      this.actualizeTotalPrice() 
      this.addActive(budgetId);
    } else {
      this.serviciosContratados = this.serviciosContratados.filter(budget => budget.id !== budgetId);
      this.actualizeTotalPrice() 
      this.removeActive(budgetId);
    }
  }

  actualizeTotalPrice() {
    this.totalPrice = this.serviciosContratados.reduce((total, budget) => total + budget.price, 0);
  }

  addActive(id: number) {
    const serviceElement = document.getElementById(`service-${id}`);
    const optionsElement = document.getElementById(`options-${id}`);
    if (serviceElement) {
      serviceElement.classList.add('service-active');
    }
    if (optionsElement) {
      optionsElement.classList.remove('ocultar');
    }
  }

  removeActive(id: number) {
    const serviceElement = document.getElementById(`service-${id}`);
    // const optionsElement = document.getElementById(`options-${id}`);
    if (serviceElement) {
      serviceElement.classList.remove('service-active');
    }
    // if (optionsElement) {
    //   optionsElement.classList.add('ocultar');
    // }
  }

}
