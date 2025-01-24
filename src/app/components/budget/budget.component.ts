import { Component, Input, inject, effect, ViewChild} from '@angular/core';
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

pages = inject(BudgetService).pages;
languages = inject(BudgetService).languages;
panelExtraPrice = inject(BudgetService).panelExtraPrice;
serviciosContratados = inject(BudgetService).serviciosContratados

constructor(private budgetService: BudgetService) {
  this.budgets = this.BudgetService.getBudgets()
  effect(() => {
    this.actualizeTotalPrice();
  });
}
serviciosPresu: Budget[] = [];
totalPrice: number = 0;

  onCheckboxChange(event: any, budgetPrice: number, budgetId: number) {
    if (event.target.checked) {
      this.serviciosPresu.push(this.budgets.find(budget => budget.id === budgetId)!);
      this.actualizeTotalPrice() 
      this.addActive(budgetId);
    } else {
      this.serviciosPresu = this.serviciosPresu.filter(budget => budget.id !== budgetId);
      this.actualizeTotalPrice() 
      this.removeActive(budgetId);
    }
    this.actualiceServiciosContratados();
  }

  actualiceServiciosContratados() {
    this.budgetService.serviciosContratados.set(this.serviciosPresu);
  }

  actualizeTotalPrice() {
    this.budgetService.budgets[2].price = 500 + this.panelExtraPrice()
    this.totalPrice = this.serviciosPresu.reduce((total, budget) => total + budget.price, 0);
    // if (this.serviciosPresu.find(budget => budget.title === "Web")) {
    //   this.totalPrice += this.panelExtraPrice();
    // // } else {
    // //   console.log("no entra al if" + this.panelExtraPrice())
    // }
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
    const optionsElement = document.getElementById(`options-${id}`);
    if (serviceElement) {
      serviceElement.classList.remove('service-active');
    }
    if (optionsElement) {
      this.resetChildForm()
      optionsElement.classList.add('ocultar');
    }
  }

  @ViewChild(PanelComponent) childComponent!: PanelComponent;

  resetChildForm(): void {
    this.childComponent.resetForm();
    this.childComponent.update();
  }

}
