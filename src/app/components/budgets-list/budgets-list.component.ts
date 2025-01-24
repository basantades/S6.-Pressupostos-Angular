import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-budgets-list',
  imports: [ ],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
budgetsSavedList = inject(BudgetService).getBudgetsSavedList();

}
