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

  onCheckboxChange(event: any, budgetPrice: number) {
    if (event.target.checked) {
      this.totalPrice += budgetPrice;
    } else {
      this.totalPrice -= budgetPrice;
    }
  }

}
