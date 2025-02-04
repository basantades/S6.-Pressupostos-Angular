import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-budgets-list',
  imports: [ ],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {

budgetService = inject(BudgetService);

budgetsSavedList = this.budgetService.getBudgetsSavedList();
getSortedBudgets = this.budgetService.getSortedBudgets;
orderBy = this.budgetService.orderBy;
setOrderBy = this.budgetService.setOrderBy;
invertido = this.budgetService.invertido;
searchBudgets = this.budgetService.searchBudgets;
searchQuery = this.budgetService.searchQuery;

}
