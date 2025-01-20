import { Component, Input, inject} from '@angular/core';
import { Budget } from '../../interfaces/budget';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-budget',
  imports: [],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
@Input() budgets: Budget[] = []

BudgetService = inject(BudgetService);


constructor(){
  this.budgets = this.BudgetService.getBudgets()
}

totalPrice: number = 0;

  onCheckboxChange(event: any, budgetPrice: number, budgetId: number) {
    if (event.target.checked) {
      this.totalPrice += budgetPrice;
      this.addActive(budgetId);
    } else {
      this.totalPrice -= budgetPrice;
      this.removeActive(budgetId);
    }
  }

  addActive(id: number) {
    const serviceElement = document.getElementById(`service-${id}`);
    if (serviceElement) {
      serviceElement.classList.add('service-active');
    }
  }

  removeActive(id: number) {
    const serviceElement = document.getElementById(`service-${id}`);
    if (serviceElement) {
      serviceElement.classList.remove('service-active');
    }
  }

}
