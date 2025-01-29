import { Component, Input, inject, effect, ViewChild} from '@angular/core';
import { Budget } from '../../interfaces/budget';
import { BudgetService } from '../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';


@Component({
  selector: 'app-budget',
  imports: [PanelComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
@Input() budgets: Budget[] = []

BudgetService = inject(BudgetService);


seo = inject(BudgetService).seo;
ads = inject(BudgetService).ads;
web = inject(BudgetService).web;
pages = inject(BudgetService).pages;
languages = inject(BudgetService).languages;
panelExtraPrice = inject(BudgetService).panelExtraPrice;
totalPrice = inject(BudgetService).totalPrice;
serviciosContratados = inject(BudgetService).serviciosContratados

constructor(private budgetService: BudgetService) {
  this.budgets = this.BudgetService.getBudgets();

  // Efecto para calcular automáticamente el precio total al cambiar cualquier señal
  effect(() => {
    this.calculateTotalPrice();
  });
}

onCheckboxChange(budget: Budget, event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement) return;

  const isChecked = inputElement.checked;

  if (budget.id === 1) {
    this.seo.set(isChecked);
  } else if (budget.id === 2) {
    this.ads.set(isChecked);
  } else if (budget.id === 3) {
    this.web.set(isChecked);
    if (!isChecked) {
      this.resetChildForm();
    }
  }
    this.updateServiciosContratados();
}

updateServiciosContratados() {
  const activeServices = this.budgets.filter((service) => {
    if (service.id === 1) return this.seo();
    if (service.id === 2) return this.ads();
    if (service.id === 3) return this.web();
    return false;
  });

  this.serviciosContratados.set(activeServices);
}

calculateTotalPrice() {
  const basePrice = this.serviciosContratados().reduce((total, service) => total + service.price, 0);
  const panelPrice = this.web() ? this.panelExtraPrice() : 0;
  this.totalPrice.set(basePrice + panelPrice);
}

  @ViewChild(PanelComponent) childComponent!: PanelComponent;

  resetChildForm(): void {
    this.childComponent.resetForm();
    this.childComponent.update();
  }

}
