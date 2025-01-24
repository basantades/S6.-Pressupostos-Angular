import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-budget-save',
  imports: [],
  templateUrl: './budget-save.component.html',
  styleUrl: './budget-save.component.scss'
})
export class BudgetSaveComponent {


pages = inject(BudgetService).pages;
languages = inject(BudgetService).languages;
panelExtraPrice = inject(BudgetService).panelExtraPrice
serviciosContratados = inject(BudgetService).serviciosContratados


}
